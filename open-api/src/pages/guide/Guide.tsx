import React from "react";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";

import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

// eslint-disable-next-line import/named,@typescript-eslint/ban-ts-comment
// @ts-ignore
import raw from "../markdown/openfx-guide.md";
import { Container } from "react-bootstrap";

class Props {}

class Guide extends React.Component {
  constructor(props: Readonly<Props> | Props) {
    super(props);
    this.state = { guideMd: "" };
  }

  componentDidMount() {
    fetch(raw)
      .then((response) => response.text())
      .then((text) => {
        this.setState({ guideMd: text });
      });
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const guide = this.state.guideMd;
    return (
      <Container>
        <Viewer initialValue={guide} plugins={[codeSyntaxHighlight]} />
      </Container>
    );
  }
}

export default Guide;
