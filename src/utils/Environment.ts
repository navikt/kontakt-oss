const Environment = () => {
    return {
        MILJO: (window as any).appSettings.MILJO,
    };
};

export default Environment();
