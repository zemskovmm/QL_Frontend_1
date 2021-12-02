import React, { FC } from 'react';
import { Route } from 'react-router-dom';

import { ProtectedElement } from './protected-element';

type PropsType={
    element: React.ReactElement;
    path: string;
    redirect:  string;
}

const ProtectedRoute = ({element,path,redirect}:PropsType) => {
    return <Route path={path} element={<ProtectedElement element={element} redirect={redirect} />} />
}

export default ProtectedRoute;