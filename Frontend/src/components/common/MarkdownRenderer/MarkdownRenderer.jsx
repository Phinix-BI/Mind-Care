import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';


const MarkdownRenderer = ({markdownContent}) => {
    return (
        <ReactMarkdown remarkPlugins={[gfm]}>{markdownContent}</ReactMarkdown>
    );
    }

export default MarkdownRenderer;