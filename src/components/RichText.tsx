import linkifyHtml from 'linkify-html';
const RichText = ({ htmlString }: RichTextProps) => {
  return <div dangerouslySetInnerHTML={{ __html:linkifyHtml(htmlString, {className: 'underline text-blue-600 hover:text-blue-800 visited:text-purple-600', target: '_blank'}) }}></div>
}

interface RichTextProps {
  htmlString: string
}

export default RichText
