import React from 'react';

import { withFirebase } from './Firebase';

const SignOutButton = ({ firebase }) => (
  <button className="btn btn-sm btn-light-primary font-weight-bolder py-2 px-5" onClick={firebase.doSignOut}>Sign Out</button>
);

export default withFirebase(SignOutButton);
