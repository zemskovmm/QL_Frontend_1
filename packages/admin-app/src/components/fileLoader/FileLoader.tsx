import React, {useEffect, useRef, useState} from "react";
import {action, observable} from "mobx";
import {FilesListDto} from "src/interfaces/FilesDto";
import {FilesApi} from "src/clients/filesApiClient";
import {useObserver} from "mobx-react";
import {AdminButton} from "src/components/common/AdminButton";

interface IFilesStore {
  current: FilesListDto,
  currentFolder: number,
  load: (id? : number) => void,
  createFolder: (title: string) => void,
  loadFile: (data: FormData) => void,
  rename: (title: string, id: number) => void,
  delete: (id: number) => void
}
interface IFileLoader {
  selectMedia?: (value:number)=>void
}


export const FileLoader = ({selectMedia}:IFileLoader) => {
  const [filesStore] = useState(() => observable<IFilesStore>({
      current: {
        title: null,
        parentId: null,
        directories: [],
        media: [],
        id: 0
      },

      currentFolder: 0,

      async load(folderId) {
        const res:FilesListDto = folderId
          ? await FilesApi.getFolderById(folderId)
          : await FilesApi.getFolder();

        if (res) {
          this.current = res
          this.currentFolder = folderId || 0
        }
      },
      async createFolder(title) {
        const res = this.currentFolder
          ? await FilesApi.createFolder({title,parentId:this.currentFolder})
          : await FilesApi.createFolder({title});

        if (res) {
          this.currentFolder
            ? this.load(this.currentFolder)
            : this.load()
        }
      },
      async loadFile(data) {
        const res = await FilesApi.loadFile(data)

        if (res) {
          this.currentFolder
            ? this.load(this.currentFolder)
            : this.load()
        }
      },
      async rename(title, id) {
        const res = await FilesApi.updateFolder(id,{title})

        if (res) {
          this.currentFolder
            ? this.load(this.currentFolder)
            : this.load()
        }
      },
      async delete(id) {
        const res = await FilesApi.deleteFolder(id)

        if (res) {
          this.currentFolder
            ? this.load(this.currentFolder)
            : this.load()
        }
      }
    }, {
      load: action.bound,
      createFolder: action.bound,
      rename: action.bound,
      loadFile: action.bound,
      delete: action.bound
    })
  )


  const [canLoad, setCanLoad] = useState(false)
  const [isFirstRun, setFirstRun] = useState(true)

  useEffect(()=>{
    if (isFirstRun) {
      filesStore.load()
    } else {
      setFirstRun(false)
    }
  },[isFirstRun])

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
        {filesStore.current.title !== null && <span className="cursor-pointer" onClick={()=>filesStore.load(filesStore.current.parentId ? filesStore.current.parentId : 0)}>
          [..]
        </span>}

        {(filesStore.current.directories.length || filesStore.current.media.length)
          ? <>
            {filesStore.current.directories.sort((a, b) => a.id - b.id).map(({title, id})=>(
              <div key={id} className="py-2 flex justify-between items-center">
                <span className="font-bold cursor-pointer" onClick={()=>filesStore.load(id)}>
                  {title}
                </span>
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
              <div key={id} className="py-2 flex justify-between items-center">
                <span onClick={()=>selectMedia ? selectMedia(id) : {}} className="cursor-pointer">
                  {title}
                </span>
                <img onClick={()=>selectMedia ? selectMedia(id) : {}} className="mr-2 cursor-pointer" src={`https://ql.dotlic.ru/api/media/scaled/${id}?dimension=128`} alt=""/>
              </div>
            ))}
          </>
          :  "Empty folder"
        }

      </div>
    </div>
  ))
}
