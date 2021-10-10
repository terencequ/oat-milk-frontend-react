import styled from "@emotion/styled";
import {IconButton, Paper, Theme} from "@material-ui/core";
import {FC, useState} from "react";
import {isElectron} from "../../shared/helpers/ElectronHelpers";
import {themeSpacing} from "../styles/GlobalStyles";
import maximiseIcon from "assets/images/windowbar/maximise.png";
import minimiseIcon from "assets/images/windowbar/minimise.png";
import restoreIcon from "assets/images/windowbar/restore.png";
import closeIcon from "assets/images/windowbar/close.png";

const {ipcRenderer} = isElectron() ? window.require('electron') : {ipcRenderer:null};

export const windowBarHeight = 25;

const StyledWindowBar = styled(Paper)`
  width: 100vw;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  z-index: ${(props) => {
    const theme = props.theme as Theme;
    return theme.zIndex.drawer + 1;
  }};
  background-color: ${(props) => {
    const theme = props.theme as Theme;
    
    if(theme.palette.mode === "light"){
        return theme.palette.primary.dark;
    } else {
      return theme.palette.grey["800"];
    }
  }};
  display: flex;
  flex-direction: row-reverse;
  padding: 0 ${themeSpacing(2)};
  height: ${windowBarHeight}px;
`

const StyledWindowIconContainer = styled.div`
  -webkit-app-region: no-drag;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
`

const StyledWindowIcon = styled.img`
  -webkit-app-region: no-drag;
  width: 15px;
  height: 15px;
  filter: ${(props) => {
      const theme = props.theme as Theme;
      if(theme.palette.mode === "light"){
          return 'none';
      } else {
          return 'invert(100%)';
      }
  }};
`

/**
 * Bar for dragging
 * @constructor
 */
const WindowBar: FC = () => {
    let [isMaximised, setIsMaximised] = useState(false);
    ipcRenderer.on('isMaximised-reply', (event: any, args: any) => {
        console.log("isMaximised", args);
        setIsMaximised(args)
    });

    const minimise = () => {
        ipcRenderer.send('minimise');
    }
    const restore = () => {
        ipcRenderer.send('restore');
        ipcRenderer.send('isMaximised-query')
    }
    const maximise = () => {
        ipcRenderer.send('maximise');
        ipcRenderer.send('isMaximised-query')
    }
    const close = () => {
        ipcRenderer.send('close');
    }

    return <StyledWindowBar elevation={0} square>

        <StyledWindowIconContainer>
            <IconButton onClick={minimise}>
                <StyledWindowIcon src={minimiseIcon}/>
            </IconButton>
            {isMaximised ?
                <IconButton onClick={restore}>
                    <StyledWindowIcon src={restoreIcon}/>
                </IconButton>
                : <IconButton onClick={maximise}>
                    <StyledWindowIcon src={maximiseIcon}/>
                </IconButton>
            }
            <IconButton edge={"end"} onClick={close}>
                <StyledWindowIcon src={closeIcon}/>
            </IconButton>
        </StyledWindowIconContainer>
    </StyledWindowBar>
}

export default WindowBar;