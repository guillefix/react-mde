import * as React from "react";
import { MarkdownHelp } from "./components/MarkdownHelp";
import * as Showdown from "showdown";

export interface ReactMdePreviewProps {
    previewRef?: (ref: HTMLDivElement) => void;
    showdownOptions?: any;
    markdown: string;
    helpVisible: boolean;
}

export interface ReactMdePreviewState {
}

export class ReactMdePreview extends React.Component<ReactMdePreviewProps, ReactMdePreviewState> {
    converter: Showdown.Converter;
    preview: HTMLDivElement;

    static defaultProps: Partial<ReactMdePreviewProps> = {
        helpVisible: true,
    };

    constructor(props) {
        super(props);
        const {showdownOptions} = props;
        this.converter = new Showdown.Converter(showdownOptions ? showdownOptions : undefined);
    }

    render() {
        const {markdown, previewRef, helpVisible} = this.props;
        const html = this.converter.makeHtml(markdown) || "<p>&nbsp</p>";
        return (
            <div className="mde-preview">
                <div
                    className="mde-preview-content"
                    dangerouslySetInnerHTML={{__html: html}}
                    ref={(p) => {
                        this.preview = p;
                        if (previewRef) {
                            previewRef(p);
                        }
                    }}
                />
                {helpVisible && <div className="mde-help">
                    <MarkdownHelp/>
                </div>}
            </div>
        );
    }
}
