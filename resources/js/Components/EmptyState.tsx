interface EmptyStateProps {
    text?: string;
    width?: string;
    height?: string;
}

export default function EmptyState(
    { text, width, height }: EmptyStateProps
) {
    return (
        <div className="flex flex-col justify-center items-center">
            <img width={width || '250'} height={height} src="/img/empty.svg" alt="" />
            <p className="text-gray-400 dark:text-gray-500 font-bold text-3xl">{text || "No se encontraron datos"}</p>
        </div>
    );
}
