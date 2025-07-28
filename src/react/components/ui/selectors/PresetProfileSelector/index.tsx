import SelectBox from "../../../../templates/SelectBox";
import { PresetProfile } from "../../../../../types";

export default function PresetProfileSelector(props: {
    profiles: PresetProfile[];
    initialSelected?: number;
    className?: string;
}) {
    return (
        <SelectBox
            options={props.profiles.map((val) => val.name)}
            defaultSelected={props.initialSelected}
            direction={"up"}
            className={props.className}
        ></SelectBox>
    );
}
