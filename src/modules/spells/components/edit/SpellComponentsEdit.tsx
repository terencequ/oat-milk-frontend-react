import {ChangeEvent, FC} from "react";
import styled from "@emotion/styled";
import {Checkbox, FormControl, FormControlLabel, Typography} from "@mui/material";
import {SpellComponentsRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

const StyledComponents = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledComponentsForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

interface SpellComponentsEditProps {
    components: SpellComponentsRequest;
    setComponents: (components: SpellComponentsRequest) => void;
}

const SpellComponentsEdit: FC<SpellComponentsEditProps> = ({components, setComponents}) => {
    const onChangeVerbal = (e: ChangeEvent<HTMLInputElement>) => {
        const newComponents = {
            ...components,
            verbal: e.target.checked,
        };
        setComponents(newComponents);
    }
    const onChangeSomatic = (e: ChangeEvent<HTMLInputElement>) => {
        const newComponents = {
            ...components,
            somatic: e.target.checked,
        };
        setComponents(newComponents);
    }
    const onChangeMaterial = (e: ChangeEvent<HTMLInputElement>) => {
        const newComponents = {
            ...components,
            material: e.target.checked,
        };
        setComponents(newComponents);
    }
    return <StyledComponents>
        <Typography gutterBottom variant={"subtitle1"}>Components</Typography>
        <FormControl>
            <StyledComponentsForm>
                <FormControlLabel label="Verbal" labelPlacement={"top"} control={<Checkbox checked={components.verbal} onChange={onChangeVerbal}/>}/>
                <FormControlLabel label="Somatic" labelPlacement={"top"} control={<Checkbox checked={components.somatic} onChange={onChangeSomatic}/>}/>
                <FormControlLabel label="Material" labelPlacement={"top"} control={<Checkbox checked={components.material} onChange={onChangeMaterial}/>}/>
            </StyledComponentsForm>
        </FormControl>
    </StyledComponents>
}

export default SpellComponentsEdit;
