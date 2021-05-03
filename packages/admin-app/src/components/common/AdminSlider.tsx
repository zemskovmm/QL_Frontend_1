import ReactSlider from "react-slider";


export const AdminSlider = (props: { value: number, max: number, min: number, onChange: (v: number) => void }) => {

  return <div className="flex w-64 m-auto items-center h-8 justify-center">
    <div className="py-1 relative min-w-full">
      <ReactSlider
        marks
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={e => props.onChange(e)}

        renderTrack={(props, state) => {
          if (state.index == 0)
            return <div {...props} className="h-2 bg-green-600 rounded-full"/>
          return <div {...props} className="h-2 bg-gray-200 rounded-full"/>
        }}

        renderThumb={(props, state) => {
          return <div {...props}
                      className="absolute h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer"
                      unselectable="on" onSelectCapture={() => false}>
            <div className="relative -mt-2 w-1">
              <div className="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full"
                   style={{marginLeft: '-20.5px'}}>
                <div className="relative shadow-md">
                  <div className="bg-black -mt-8 text-white truncate text-xs rounded py-1 px-4">{state.valueNow}
                  </div>
                  <svg className="absolute text-black w-full h-2 left-0 top-100" x="0px" y="0px"
                       viewBox="0 0 255 255">
                    <polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
                  </svg>
                </div>
              </div>
            </div>
          </div>;
        }}
      />
    </div>
  </div>;
}
/*<div class="flex  w-64 m-auto items-center h-32 justify-center">
<div class="py-1 relative min-w-full">
    <div class="h-2 bg-gray-200 rounded-full">
        <div class="absolute h-2 rounded-full bg-teal-600 w-0" style="width: 58.5714%;"></div>
        <div class="absolute h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer" unselectable="on" onselectstart="return false;" style="left: 58.5714%;">
            <div class="relative -mt-2 w-1">
                <div class="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full" style="margin-left: -20.5px;">
                    <div class="relative shadow-md">
                        <div class="bg-black -mt-8 text-white truncate text-xs rounded py-1 px-4">92</div>
                        <svg class="absolute text-black w-full h-2 left-0 top-100" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve">
                            <polygon class="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute text-gray-800 -ml-1 bottom-0 left-0 -mb-6">10</div>
        <div class="absolute text-gray-800 -mr-1 bottom-0 right-0 -mb-6">150</div>
    </div>
</div>
</div>
*/
