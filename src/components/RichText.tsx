const RichText = ({ htmlString }: RichTextProps) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
}

interface RichTextProps {
  htmlString: string
}

export default RichText
