import React from 'react';
import { useState } from 'react';
import { Menu, Columns, Button, Section, Container, Hero, Heading, Navbar } from 'react-bulma-components';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import CreateAntigen from './create';
import EditAntigen from './edit';
import ViewAntigen from './view';

function App() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <Columns>
        <Columns.Column size="one-fifth">
          <Menu>
            <Menu.List title="Gerry Gancer Dames">
              <Menu.List.Item active={false}>
                <Link to={`${url}`}>New Antigen</Link>
              </Menu.List.Item>
              <Menu.List.Item active={true}>
                <Link to={`${url}/edit`}>SugarSnap</Link>
              </Menu.List.Item>
            </Menu.List>
          </Menu>
        </Columns.Column>
        <Columns.Column>
          <Route exact path={path} component={CreateAntigen} />
          <Route exact path={`${path}/edit`} render={()=>EditAntigen(url)} />
          <Route exact path={`${path}/view`} component={ViewAntigen} />
        </Columns.Column>
      </Columns>
    </div>
  )
}

export default App;
