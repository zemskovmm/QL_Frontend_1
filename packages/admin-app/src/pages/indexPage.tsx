import React from 'react';
import {Test} from '@project/components';
import {PageEditorStore} from "../components/pageEditor/PageEditorStore";
import {PageEditor} from "../components/pageEditor/PageEditor";
const pageStore = new PageEditorStore(null, null);

export const IndexPage = ()=>(
  <div>
    <div className="bg-red-500">Red</div>
    <Test/>
    <PageEditor store={pageStore}/>

  </div>

)
