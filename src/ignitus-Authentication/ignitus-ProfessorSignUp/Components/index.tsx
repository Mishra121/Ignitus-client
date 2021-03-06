import React, { useState, useEffect } from 'react';
import {
  isEmpty,
  isEqual,
  SharedAuthentication,
  SignupStatePayload,
  withErrorBoundary,
} from '../../../ignitus-Shared';
import { Props } from '../types';

export const SignUp: React.FC<Props> = withErrorBoundary(
  ({ signUpData, signUpRequest, clearPreviousSignUp }) => {
    const [state, setState] = useState(SignupStatePayload);

    const { userName, email, password, confirmPassword } = state;

    useEffect(() => () => clearPreviousSignUp(), [clearPreviousSignUp]);

    const handleSubmit = e => {
      e.preventDefault();
      clearPreviousSignUp();

      if (
        isEmpty(userName) ||
        isEmpty(email) ||
        isEmpty(password) ||
        isEmpty(confirmPassword)
      ) {
        setState({
          ...state,
          emptyMessage: true,
          invalidEmail: false,
          equalmessage: false,
        });
        return;
      }

      if (typeof email !== 'undefined') {
        const lastAtPos = email.lastIndexOf('@');
        const lastDotPos = email.lastIndexOf('.');

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            email.indexOf('@@') === -1 &&
            lastDotPos > 2 &&
            email.length - lastDotPos > 2
          )
        ) {
          setState({
            ...state,
            emptyMessage: false,
            invalidEmail: true,
            equalmessage: false,
          });
          return;
        }
      }

      if (!isEqual(password, confirmPassword)) {
        setState({
          ...state,
          invalidEmail: false,
          emptyMessage: false,
          equalmessage: true,
        });
        return;
      }

      signUpRequest(userName, email, password, 'professor');
      setState(SignupStatePayload);
    };

    return (
      <SharedAuthentication
        authenticationType="SignUp"
        // eslint-disable-next-line jsx-a11y/aria-role
        role="Professor"
        state={state}
        setState={setState}
        handleSubmit={handleSubmit}
        authenticationData={signUpData}
      />
    );
  },
);
