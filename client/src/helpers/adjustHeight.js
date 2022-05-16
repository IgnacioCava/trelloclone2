export default function adjustHeightToContent(element) {
    const e = element.target

    e.style.height = 'auto';
    e.style.height = e.scrollHeight+'px';
    e.style.overflowY='hidden'
}