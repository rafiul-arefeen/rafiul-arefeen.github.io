const generalButton = document.querySelector('.general-panel');
const aiButton = document.querySelector('.ai-panel');
const maskingButton = document.querySelector('.masking-button');
const styleTransferButton = document.querySelector('.style-transfer-button');

const editorPanelContent = document.querySelector('.editor-panel-content');

generalButton.addEventListener('click', () => {
    generalButton.classList.add('active');
    aiButton.classList.remove('active');
    editorPanelContent.dataset.activePanel = 'general';
    hideMaskingPanel();
    hideStyleTransferPanel();
    hideAIPanel();
    showGeneralPanel();
});

aiButton.addEventListener('click', () => {
    generalButton.classList.remove('active');
    aiButton.classList.add('active');
    editorPanelContent.dataset.activePanel = 'ai';
    hideGeneralPanel();
    hideMaskingPanel();
    hideStyleTransferPanel();
    showAIPanel();
});

styleTransferButton.addEventListener('click', () => {
    hideAIPanel();
    showStyleTransferPanel();
});

maskingButton.addEventListener('click', () => {
    hideAIPanel();
    showMaskingPanel();
});

function hideGeneralPanel() {
    const editorPanel = document.querySelector('.editor-panel');
    editorPanel.style.display = 'none';
}

function showGeneralPanel() {
    const editorPanel = document.querySelector('.editor-panel');
    editorPanel.style.display = 'block';
}

function hideAIPanel() {
    const aiPanel = document.querySelector('.ai-menu');
    aiPanel.style.display = 'none';
}

function showAIPanel() {
    const aiPanel = document.querySelector('.ai-menu');
    aiPanel.style.display = 'block';
}

function hideMaskingPanel() {
    const maskingPanel = document.querySelector('.masking-panel');
    maskingPanel.style.display = 'none';
}

function showMaskingPanel() {
    const maskingPanel = document.querySelector('.masking-panel');
    maskingPanel.style.display = 'block';
}

function hideStyleTransferPanel() {
    const styleTransferPanel = document.querySelector('.style-transfer-panel');
    styleTransferPanel.style.display = 'none';
}

function showStyleTransferPanel() {
    const styleTransferPanel = document.querySelector('.style-transfer-panel');
    styleTransferPanel.style.display = 'block';
}
