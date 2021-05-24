import {AdminButton} from "src/components/common/AdminButton";
import {RouterLink} from "mobx-state-router";
import {RouteNames} from "src/routing/routes";
import {useObserver} from "mobx-react";
import {useRootStore} from "src/utils/rootStoreUtils";
import {useRef, useState} from "react";


const FileLoader = () => {
  const { filesStore } = useRootStore();
  const [canLoad, setCanLoad] = useState(false)
  const inputFile = useRef<any>(null);

  return useObserver(() => (
    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <div className="m-2 flex flex-col justify-center">
        <input className="m-2" ref={inputFile} type="file" onChange={e=>setCanLoad(!!e?.target?.files?.length)}/>
        {canLoad && <div className="m-2">
            <AdminButton
              color={"primary"}
              onClick={() => {
                const data = new FormData();
                data.append("UploadedFile",inputFile?.current?.files[0])
                data.append("FileType","Image")
                if (filesStore.currentFolder > 0) data.append("StorageFolderId",filesStore.currentFolder.toString())
                filesStore.loadFile(data)
              }}>
              Load file
            </AdminButton>
          </div>
        }
        <div className="m-2">
          <AdminButton color={"primary"} onClick={()=>{
            const text = prompt('New name for folder:')
            if (text) return filesStore.createFolder(text)
          }}>Create folder</AdminButton>
        </div>
      </div>
      <h1 className="m-4 w-full text-center font-bold">{filesStore.current.title === null ? "Root Folder" : filesStore.current.title}</h1>
      <div className="m-8 flex flex-col">
        {filesStore.current.title !== null
          ? <RouterLink routeName={RouteNames.fileList}>
            [..]
          </RouterLink>
          : <RouterLink routeName={RouteNames.fileListById} params={{ id: filesStore.current.parentId?.toString() || "0" }}>
            [..]
          </RouterLink>
        }

        {(filesStore.current.directories.length || filesStore.current.media.length)
          ? <>
            {filesStore.current.directories.sort((a, b) => a.id - b.id).map(({title, id})=>(
              <div className="py-2 flex justify-between items-center">
                <RouterLink key={id} className="font-bold" routeName={RouteNames.fileListById} params={{ id: id.toString() }}>
                  {title}
                </RouterLink>
                <div className="inline-flex">
                  <div className="mr-2">
                    <AdminButton color={"success"} onClick={()=>{
                      const text = prompt('New name for folder:')
                      if (text) return filesStore.rename(text,id)
                    }}>Rename</AdminButton>
                  </div>
                  <div className="mr-2">
                    <AdminButton
                      color={"danger"}
                      onClick={()=>{if (confirm(`Are you sure?`)) return filesStore.delete(id)}}>
                        Delete
                    </AdminButton>
                  </div>
                </div>
              </div>

            ))}
            {filesStore.current.media.sort((a, b) => a.id - b.id).map(({title, id})=>(
              <div className="py-2 flex justify-between items-center">
                <span key={id}>
                  {title}
                </span>
                <img className="mr-2" src={`https://ql.dotlic.ru/api/media/scaled/${id}?dimension=128`} alt=""/>
              </div>
            ))}
          </>
          :  "Empty folder"
        }

      </div>
    </div>
  ))
}

export default FileLoader;
