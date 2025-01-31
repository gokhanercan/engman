interface BadgeProps {
    label: string;
    colorName?: string | null;
    description?: string | null;
}

export default function Badge({label,description, colorName = 'deepskyblue'}: BadgeProps) {
    if (!label) return null;
    //console.log("ColorName",colorName);
    
    return (
        <span
            style={{ background: `${colorName}`}}
            className="mr-1"
            title={description ?? ""}
            {...{ theme: `badge primary` }}
        >
            {label}
        </span>
    );
}