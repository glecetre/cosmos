type IconProps = {
    name: 'magnifying-glass' | 'cross';
    size?: 'md';
};

export function Icon(props: IconProps) {
    const iconSize = props.size ?? 'md';

    return (
        <svg width={SIZE_VALUE[iconSize]} height={SIZE_VALUE[iconSize]}>
            <use href={`/icons.svg#${props.name}`} />
        </svg>
    );
}

const SIZE_VALUE: Record<NonNullable<IconProps['size']>, number> = {
    md: 14,
};
