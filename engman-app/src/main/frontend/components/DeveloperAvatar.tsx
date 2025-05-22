import DeveloperM from "Frontend/generated/com/engman/models/DeveloperM";
import { Avatar } from "@vaadin/react-components/Avatar.js";
import { ContextMenu } from "@vaadin/react-components";
import { useState } from "react";

interface DeveloperAvatarProps {
    developer: DeveloperM;
    onDeveloperView?: (developer: DeveloperM) => void;
    onDeveloperMouseOver?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>,developer: DeveloperM) => Promise<void>;
    onDeveloperMouseLeave?: (developer: DeveloperM) => Promise<void>;
}

export default function DeveloperAvatar({developer,onDeveloperView,onDeveloperMouseOver,onDeveloperMouseLeave}: DeveloperAvatarProps) {
    const ctxItems = [{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }];
    //const [hoverActive, setHoverActive] = useState<boolean>(false);

    const handleContextMenu = (e: any) => {
        if(e.detail.value.text === 'View'){
            const devName = e.target.querySelector("div").getAttribute("dev-name");
            if(onDeveloperView){
                onDeveloperView(developer);
            }
        }
        else{
            console.log("Not implemented Action: ", e.detail.value.text);
        }
    }
    //todo:rename.
    const handleMouseLeave = async (e: any, developer:DeveloperM) => {
        // console.log("MouseLeave");
        if(onDeveloperMouseLeave){
            await onDeveloperMouseLeave(developer);
            //setHoverActive(false);
        }
    }
    const handleMouseOver = async (e: any, developer:DeveloperM) => {
        //console.log("MouseOver");        
        if(onDeveloperMouseOver){
            await onDeveloperMouseOver(e,developer);
            // setHoverActive(true);
        }
    }

    return (
        <>
            <ContextMenu 
                        //  openOn="click"  //switches left-click to right-click
                         items={ctxItems} 
                         onItemSelected={handleContextMenu} >
                <div className=""
                     dev-name={developer.name}
                     style={{ width: '36px', height: '38px' }}
                     onClick={() => onDeveloperView && onDeveloperView(developer)}
                     onMouseOver={(e) => handleMouseOver(e,developer) }
                     onMouseLeave={(e) => handleMouseLeave(e,developer)}
                     >
                    <Avatar name={`${developer.name}`} />
                </div>
                {/* <span>{hoverActive==true ? "active" : "passive"}</span> */}
            </ContextMenu>
            
        </>
    );

}