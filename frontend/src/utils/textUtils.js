// utils/textUtils.js
export function extractPlainText(blocks) {
    if (!blocks || !Array.isArray(blocks)) return '';
    
    return blocks
        .map(block => {
            if (block.type === 'paragraph' && block.children) {
                return block.children
                    .filter(child => child.type === 'text')
                    .map(child => child.text)
                    .join('');
            }
            return '';
        })
        .join(' ')
        .trim();
}

export function truncateText(text, limit = 150) {
    if (text.length <= limit) return text;
    return text.substring(0, limit).trim() + '...';
}