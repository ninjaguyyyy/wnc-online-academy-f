import React from 'react';

function Admin() {
  return (
    <>
      <ToastContainer autoClose={5000} hideProgressBar closeButton={<CloseButton />} />
      <HashRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/app/main" />} />
          <Route path="/app" exact render={() => <Redirect to="/app/main" />} />
          <PrivateRoute path="/app" dispatch={this.props.dispatch} component={LayoutComponent} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/error" exact component={ErrorPage} />
          <Route component={ErrorPage} />
        </Switch>
      </HashRouter>
    </>
  );
}

export default Admin;
