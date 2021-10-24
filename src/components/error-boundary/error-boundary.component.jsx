import React, { Component } from "react";
import {
  ErrorImageOverlay,
  ErrorImageText,
  ErrorImageContainer,
} from "./error-boundary.styles";

class ErrorBoundary extends Component {
  state = {
    hasErrored: false,
  };

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log("error", error);
  }

  render() {
    if (this.state.hasErrored)
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl={"https://i.imgur.com/yW2W9SC.png"} />
          <ErrorImageText>Sorry This page is broken.</ErrorImageText>
        </ErrorImageOverlay>
      );

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
