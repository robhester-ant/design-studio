// Main Application

const App = {
  attachments: [],

  async init() {
    // Initialize stores
    ThemeStore.init();
    ClaudeAPI.init();

    // Initialize preview
    PreviewManager.init();

    // Set up UI event listeners
    this.setupEventListeners();

    // Subscribe to state changes
    ThemeStore.subscribe(state => this.renderThemeList(state));
    ClaudeAPI.subscribe(state => this.renderChat(state));

    // Initial render
    this.renderThemeList(ThemeStore.getState());
    this.renderChat(ClaudeAPI.getState());
  },

  setupEventListeners() {
    // Theme list
    document.getElementById('new-theme-btn').addEventListener('click', () => {
      const name = prompt('Theme name:', 'New Theme');
      if (name) {
        ThemeStore.createTheme(name);
      }
    });

    document.getElementById('theme-search').addEventListener('input', (e) => {
      this.filterThemes(e.target.value);
    });

    // Preview tabs
    document.querySelectorAll('.preview-tabs .tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.preview-tabs .tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        PreviewManager.setCategory(tab.dataset.preview);
      });
    });

    // Viewport buttons
    document.querySelectorAll('.viewport-buttons .btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.viewport-buttons .btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        PreviewManager.setViewport(btn.dataset.viewport);
      });
    });

    // API Key modal
    document.getElementById('api-key-btn').addEventListener('click', () => {
      document.getElementById('api-key-modal').showModal();
    });

    document.getElementById('api-key-save').addEventListener('click', () => {
      const key = document.getElementById('api-key-input').value.trim();
      if (key) {
        ClaudeAPI.setApiKey(key);
        document.getElementById('api-key-input').value = '';
        document.getElementById('api-key-modal').close();
      }
    });

    document.getElementById('api-key-clear').addEventListener('click', () => {
      ClaudeAPI.setApiKey(null);
      document.getElementById('api-key-modal').close();
    });

    // Chat
    document.getElementById('clear-chat-btn').addEventListener('click', () => {
      if (confirm('Clear all messages?')) {
        ClaudeAPI.clearMessages();
      }
    });

    document.getElementById('send-btn').addEventListener('click', () => {
      this.sendMessage();
    });

    document.getElementById('chat-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Image paste
    document.getElementById('chat-input').addEventListener('paste', (e) => {
      const items = e.clipboardData.items;
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          this.processImageFile(file);
          break;
        }
      }
    });

    // File input
    document.getElementById('attach-image-btn').addEventListener('click', () => {
      document.getElementById('file-input').click();
    });

    document.getElementById('file-input').addEventListener('change', (e) => {
      for (const file of e.target.files) {
        if (file.type.startsWith('image/')) {
          this.processImageFile(file);
        }
      }
      e.target.value = '';
    });

    // URL attachment
    document.getElementById('attach-url-btn').addEventListener('click', () => {
      const url = prompt('Enter URL:');
      if (url) {
        this.attachments.push({ type: 'url', data: url });
        this.renderAttachments();
      }
    });

    // Drag and drop
    const chatInput = document.getElementById('chat-input');
    chatInput.addEventListener('dragover', (e) => {
      e.preventDefault();
      chatInput.style.borderColor = 'var(--color-primary)';
    });

    chatInput.addEventListener('dragleave', () => {
      chatInput.style.borderColor = '';
    });

    chatInput.addEventListener('drop', (e) => {
      e.preventDefault();
      chatInput.style.borderColor = '';
      for (const file of e.dataTransfer.files) {
        if (file.type.startsWith('image/')) {
          this.processImageFile(file);
        }
      }
    });

    // Resize handles
    this.setupResizeHandles();

    // Modal close on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.close();
        }
      });
    });
  },

  setupResizeHandles() {
    const sidebar = document.getElementById('sidebar');
    const chatPanel = document.getElementById('chat-panel');

    // Sidebar resize
    this.makeResizable(
      document.getElementById('sidebar-resize'),
      (delta) => {
        const newWidth = sidebar.offsetWidth + delta;
        if (newWidth >= 150 && newWidth <= 350) {
          sidebar.style.width = newWidth + 'px';
        }
      }
    );

    // Chat resize
    this.makeResizable(
      document.getElementById('chat-resize'),
      (delta) => {
        const newWidth = chatPanel.offsetWidth - delta;
        if (newWidth >= 250 && newWidth <= 500) {
          chatPanel.style.width = newWidth + 'px';
        }
      }
    );
  },

  makeResizable(handle, onResize, vertical = false) {
    let startPos = 0;

    const onMouseDown = (e) => {
      startPos = vertical ? e.clientY : e.clientX;
      handle.classList.add('active');
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.body.style.cursor = vertical ? 'row-resize' : 'col-resize';
      document.body.style.userSelect = 'none';
    };

    const onMouseMove = (e) => {
      const currentPos = vertical ? e.clientY : e.clientX;
      const delta = currentPos - startPos;
      startPos = currentPos;
      onResize(delta);
    };

    const onMouseUp = () => {
      handle.classList.remove('active');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    handle.addEventListener('mousedown', onMouseDown);
  },

  processImageFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result.split(',')[1];
      this.attachments.push({
        type: 'image',
        data: base64,
        mediaType: file.type,
        preview: e.target.result
      });
      this.renderAttachments();
    };
    reader.readAsDataURL(file);
  },

  renderAttachments() {
    const container = document.getElementById('attachments');
    container.innerHTML = this.attachments.map((att, i) => {
      if (att.type === 'image') {
        return `
          <div class="attachment">
            <img src="${att.preview}" alt="Attachment">
            <button class="attachment-remove" data-index="${i}">&times;</button>
          </div>
        `;
      } else {
        return `
          <div class="attachment">
            <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--color-border-light); border-radius: 6px; font-size: 10px; overflow: hidden; padding: 4px;">
              ${att.data.slice(0, 20)}...
            </div>
            <button class="attachment-remove" data-index="${i}">&times;</button>
          </div>
        `;
      }
    }).join('');

    // Add remove handlers
    container.querySelectorAll('.attachment-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        this.attachments.splice(parseInt(btn.dataset.index), 1);
        this.renderAttachments();
      });
    });
  },

  async sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();

    if (!text && this.attachments.length === 0) return;
    if (!ClaudeAPI.apiKey) {
      alert('Please set your API key first');
      return;
    }
    if (ClaudeAPI.isLoading) return;

    input.value = '';
    const attachments = [...this.attachments];
    this.attachments = [];
    this.renderAttachments();

    await ClaudeAPI.sendMessage(text, attachments);
  },

  renderThemeList(state) {
    const container = document.getElementById('theme-list');
    const searchTerm = document.getElementById('theme-search').value.toLowerCase();

    const filteredThemes = state.themes.filter(theme =>
      theme.name.toLowerCase().includes(searchTerm) ||
      (theme.description && theme.description.toLowerCase().includes(searchTerm))
    );

    container.innerHTML = filteredThemes.map(theme => `
      <button class="theme-item ${theme.id === state.activeThemeId ? 'active' : ''}" data-id="${theme.id}">
        <div class="theme-item-name">${this.escapeHtml(theme.name)}</div>
        ${theme.description ? `<div class="theme-item-desc">${this.escapeHtml(theme.description)}</div>` : ''}
      </button>
    `).join('');

    // Add click handlers
    container.querySelectorAll('.theme-item').forEach(item => {
      item.addEventListener('click', () => {
        ThemeStore.setActiveTheme(item.dataset.id);
      });
    });
  },

  filterThemes(searchTerm) {
    this.renderThemeList(ThemeStore.getState());
  },

  renderChat(state) {
    const messagesContainer = document.getElementById('chat-messages');
    const emptyState = document.getElementById('chat-empty');
    const apiKeyBtn = document.getElementById('api-key-btn');

    // Update API key button
    if (state.hasApiKey) {
      apiKeyBtn.classList.add('has-key');
    } else {
      apiKeyBtn.classList.remove('has-key');
    }

    // Show/hide empty state
    if (state.messages.length === 0) {
      emptyState.style.display = 'block';
      if (!state.hasApiKey) {
        emptyState.innerHTML = `
          <div style="padding: 32px 16px; text-align: center;">
            <div style="width: 64px; height: 64px; margin: 0 auto 16px; background: var(--color-border-light); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
              </svg>
            </div>
            <h3 style="margin: 0 0 8px; font-size: 18px;">Connect to Claude</h3>
            <p style="color: var(--color-text-muted); margin: 0 0 20px; font-size: 14px;">Add your Anthropic API key to chat with Claude about your designs.</p>
            <button id="setup-api-key-btn" class="btn btn-primary" style="width: 100%;">
              Set Up API Key
            </button>
            <p style="color: var(--color-text-muted); margin: 16px 0 0; font-size: 12px;">
              Get a key at <a href="https://console.anthropic.com/settings/keys" target="_blank" style="color: var(--color-primary);">console.anthropic.com</a>
            </p>
          </div>
        `;
        // Add click handler for setup button
        document.getElementById('setup-api-key-btn')?.addEventListener('click', () => {
          document.getElementById('api-key-modal').showModal();
        });
      } else {
        emptyState.innerHTML = `
          <p>Start a conversation with Claude</p>
          <p class="text-muted">Share screenshots, paste URLs, or ask for design help.</p>
        `;
      }
      return;
    }

    emptyState.style.display = 'none';

    // Render messages
    let html = state.messages.map(msg => this.renderMessage(msg)).join('');

    if (state.isLoading) {
      html += '<div class="loading">Claude is thinking...</div>';
    }

    messagesContainer.innerHTML = html;

    // Add suggestion handlers
    messagesContainer.querySelectorAll('.apply-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        ClaudeAPI.applySuggestion(btn.dataset.messageId, btn.dataset.suggestionId);
      });
    });

    messagesContainer.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        await navigator.clipboard.writeText(btn.dataset.content);
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      });
    });

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  },

  renderMessage(msg) {
    const isUser = msg.role === 'user';
    const avatarIcon = isUser
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8V4H8"/><rect x="8" y="8" width="8" height="12" rx="2"/><path d="M12 12h.01"/></svg>';

    let contentHtml = '';
    for (const content of msg.content) {
      if (content.type === 'text') {
        contentHtml += `<div class="chat-bubble">${this.escapeHtml(content.text).replace(/\n/g, '<br>')}</div>`;
      } else if (content.type === 'image') {
        contentHtml += `<img src="data:${content.source.media_type};base64,${content.source.data}" class="chat-image" alt="Shared image">`;
      }
    }

    // Render suggestions
    if (msg.suggestions && msg.suggestions.length > 0) {
      for (const suggestion of msg.suggestions) {
        contentHtml += `
          <div class="suggestion-card">
            <div class="suggestion-header">
              <span>${this.escapeHtml(suggestion.filename)}</span>
              <div class="suggestion-actions">
                <button class="btn btn-sm copy-btn" data-content="${this.escapeHtml(suggestion.content)}">Copy</button>
                <button class="btn btn-sm btn-primary apply-btn" data-message-id="${msg.id}" data-suggestion-id="${suggestion.id}" ${suggestion.applied ? 'disabled' : ''}>
                  ${suggestion.applied ? 'Applied' : 'Apply'}
                </button>
              </div>
            </div>
            <pre class="suggestion-code">${this.escapeHtml(suggestion.content.slice(0, 500))}${suggestion.content.length > 500 ? '...' : ''}</pre>
          </div>
        `;
      }
    }

    return `
      <div class="chat-message ${isUser ? 'user' : 'assistant'}">
        <div class="chat-avatar">
          ${avatarIcon}
        </div>
        <div class="chat-content">
          ${contentHtml}
        </div>
      </div>
    `;
  },

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
