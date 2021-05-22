import { useRootStore } from "src/utils/rootStoreUtils";
import { AdminButton } from "src/components/common/AdminButton";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "src/routing/routes";
import { FilesApi } from "src/clients/filesApiClient";

export const FilesPage = () => {
  const s = useRootStore().filesStore;
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <div className="m-4 flex">
              <div className="mr-2">
                <AdminButton color={"primary"}>Load File</AdminButton>
              </div>
            </div>
            <div className="m-4 flex">
              <div className="mr-2">
                {s.current.title === null
                  ? <AdminButton color={"primary"} onClick={()=>s.createFolder('asdf')}>Create folder inside</AdminButton>
                  : <AdminButton color={"primary"} onClick={()=>s.createFolder('ffff')}>Create folder inside</AdminButton>}
              </div>
              {s.current.title !== null && <>
                <div className="mr-2">
                  <AdminButton color={"success"} onClick={()=>FilesApi.updateFolder(s.currentFolder,{title: 'aaaa'})}>Rename this folder</AdminButton>
                </div>
                <div className="mr-2">
                  <AdminButton color={"danger"} onClick={()=>FilesApi.createFolder({title: 'asdf'})}>Delete this folder</AdminButton>
                </div>
              </>}
            </div>
            <h1 className="m-4 w-full text-center font-bold">{s.current.title === null ? "Root Folder" : s.current.title}</h1>
            <div className="m-8 flex flex-col">
              {s.current.title !== null  && s.current.parentId === null
                  ? <RouterLink routeName={RouteNames.fileList}>
                      [..]
                    </RouterLink>
                  : <RouterLink routeName={RouteNames.fileListById} params={{ id: s.current.parentId?.toString() || "0" }}>
                      [..]
                    </RouterLink>
              }

              {(s.current.directories.length || s.current.media.length)
                ? <>
                    {s.current.directories.map(({title, id})=>(
                      <RouterLink key={id} className="font-bold" routeName={RouteNames.fileListById} params={{ id: id.toString() }}>
                        {title}
                      </RouterLink>
                    ))}
                    {s.current.media.map(({title, id})=>(
                      <span key={id}>
                        {title}
                      </span>
                    ))}
                  </>
                :  "Empty folder"
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
