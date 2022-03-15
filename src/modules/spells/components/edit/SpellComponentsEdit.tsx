import {ChangeEvent, FC} from "react";
import styled from "@emotion/styled";
import {Checkbox, FormControl, FormControlLabel, TextField, Typography} from "@mui/material";
import {SpellComponentsRequest, SpellRangeRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

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
    /**
     * Create a new component.
     */
    const createNewComponents: () => SpellComponentsRequest = () => ({
        verbal: components.verbal,
        verbalDescription: components.verbalDescription,
        somatic: components.somatic,
        somaticDescription: components.somaticDescription,
        material: components.material,
        materialDescription: components.materialDescription,
    });

    const onChangeVerbal = (e: ChangeEvent<HTMLInputElement>) => {
        let newComponents = createNewComponents();
        newComponents.verbal = e.target.checked;
        setComponents(newComponents);
    }

    const onChangeSomatic = (e: ChangeEvent<HTMLInputElement>) => {
        let newComponents = createNewComponents();
        newComponents.somatic = e.target.checked;
        setComponents(newComponents);
    }

    const onChangeMaterial = (e: ChangeEvent<HTMLInputElement>) => {
        let newComponents = createNewComponents();
        newComponents.material = e.target.checked;
        setComponents(newComponents);
    }

    return <StyledComponents>
        <Typography gutterBottom variant={"subtitle1"}>Components</Typography>
        <FormControl>
            <StyledComponentsForm>
                <FormControlLabel label="Verbal" labelPlacement={"top"} control={<Checkbox value={components.verbal} onChange={onChangeVerbal}/>}/>
                <FormControlLabel label="Somatic" labelPlacement={"top"} control={<Checkbox value={components.somatic} onChange={onChangeSomatic}/>}/>
                <FormControlLabel label="Material" labelPlacement={"top"} control={<Checkbox value={components.material} onChange={onChangeMaterial}/>}/>
            </StyledComponentsForm>
        </FormControl>
    </StyledComponents>
}

export default SpellComponentsEdit;
