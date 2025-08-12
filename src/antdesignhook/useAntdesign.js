


export const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
        items2.forEach(item => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};

export const handleOpenChange = (openKeys, stateOpenKeys, setStateOpenKeys, levelKeys) => {
    const currentOpenKey = openKeys.find(key => stateOpenKeys.indexOf(key) === -1);

    if (currentOpenKey !== undefined) {
        const repeatIndex = openKeys
            .filter(key => key !== currentOpenKey)
            .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey]);

        setStateOpenKeys(
            openKeys
                .filter((_, index) => index !== repeatIndex)
                .filter(key => levelKeys[key] <= levelKeys[currentOpenKey]),
        );
    } else {
        setStateOpenKeys(openKeys);
    }
};