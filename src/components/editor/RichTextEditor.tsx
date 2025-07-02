import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image'],
                        ['clean'],
                    ],
                },
            });

            quillRef.current.on('text-change', () => {
                const html = editorRef.current!.querySelector('.ql-editor')!.innerHTML;
                onChange(html);
            });
        }
    }, [onChange]);

    useEffect(() => {
        const quill = quillRef.current;
        if (quill && quill.root.innerHTML !== value) {
            quill.root.innerHTML = value;
        }
    }, [value]);

    return <div ref={editorRef} />;
};

export default QuillEditor;
