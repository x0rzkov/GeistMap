import React, { Component } from 'react'

import PdfLoader from '../SourcePdfLoader'
import PdfAnnotator from '../SourcePdfAnnotator'

class PdfViewer extends React.Component {
    /*
     * Renders a PDF along with its annotations
     */

    constructor(props) {
        super(props)
    }

    render() {
        const { url, annotations } = this.props

        return (
            <PdfLoader url={url}>
                { pdfDocument => (
                    <PdfAnnotator
                        pdfDocument={pdfDocument}
                        highlights={annotations}
                    />
                )}
            </PdfLoader>

        )
    }
}

export default PdfViewer