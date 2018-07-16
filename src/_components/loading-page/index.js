import React, { Component } from 'react'
import { Toast } from 'antd-mobile'

export default function LoadingPageComponent(props) {
  const { isLoading, error, timedout, pastDelay } = props
  if (isLoading) {
    if (timedOut) {
      return <div>Loader timed out!</div>;
    } else if (pastDelay) {
      // Display a loading screen after a set delay.
      return <div>Loading...</div>;
    } else {
      // Don't flash "Loading..." when we don't need to.
      return null;
    }
  } else if (error) {
    // If we aren't loading, maybe
    return <div>Error! Component failed to load</div>;
  } else {
    // This case shouldn't happen... but we'll return null anyways.
    return null;
  }
}
