import React, { useEffect } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from 'react-icons/ai';
import { ISettings } from '../Playground';
import SettingsModal from '@/components/Modals/SettingsModal';

type PreferenceNavProps = {
    setting:ISettings;
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const PreferenceNav:React.FC<PreferenceNavProps> = ({ setSettings,setting }) => {
    const [isFullScreen,setIsFullScreen]=React.useState<boolean>(false);
    const handleFullScreen=()=>{
        if(isFullScreen){
            document.exitFullscreen();
        }else{
            document.documentElement.requestFullscreen();
        }setIsFullScreen(!isFullScreen);
    }
    useEffect(() => {
        function exitHandler() {
            if (!document.fullscreenElement) {
                setIsFullScreen(false);
            } else {
                setIsFullScreen(true);
            }
        }
        document.addEventListener("fullscreenchange", exitHandler);
        document.addEventListener("webkitfullscreenchange", exitHandler);
        document.addEventListener("mozfullscreenchange", exitHandler);
        document.addEventListener("MSFullscreenChange", exitHandler);

        return () => {
            document.removeEventListener("fullscreenchange", exitHandler);
            document.removeEventListener("webkitfullscreenchange", exitHandler);
            document.removeEventListener("mozfullscreenchange", exitHandler);
            document.removeEventListener("MSFullscreenChange", exitHandler);
        };
    }, []);
        
        return (
    <div className='flex items-center justify-between bg-gray-100 h-11 w-full'>
        <div className='flex item-center text-black'>
            <button className='flex cursor-pointer items-center rounded focus:outline-none bg-gray-300 text-black hover:bg-gray-200 px-2 py-1.5 font-medium'>
                <div className='flex item-center px-1'>
                    <div className='text-xs text-black dark-text-black'>JavaScript</div>
                </div>
            </button>
        </div>
        <div className='flex item-center m-2'>
            <button className='relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 hover:bg-gray-200 group'
                onClick={()=>setSettings({...setting,settingsModalOpen:true})}>
                <div className='h-4 w-4 text-dark-black font-bold text-lg'>
                    <AiOutlineSetting/>
                </div>
                <div className='absolute w-auto p-2 text:sm m-2 min-w-max translate-x-3 right-0 top-5 z-10 rounded-ml shadow-md text-black bg-gray-200 origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100'>
                    Settings</div>
            </button>
            <button
                className='relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 hover:bg-gray-200 group'
                onClick={handleFullScreen}
            >
                <div className='h-4 w-4 text-dark-black font-bold text-lg'>
                    {!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
                </div>
                <div className='absolute w-auto p-2 text:sm m-2 min-w-max translate-x-3 right-0 top-5 z-10 rounded-ml shadow-md text-black bg-gray-200 origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100'>
                    Full Screen
                </div>
            </button>
        </div>
        {setting.settingsModalOpen && (<SettingsModal settings={setting} setSettings={setSettings} />
)}
    </div>
    )
}
export default PreferenceNav;