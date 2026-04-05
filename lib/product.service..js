const STORAGE_KEY = "products";

export const getProducts = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
};

export const addProduct = (product) => {
    const products = getProducts();


    const newProduct = {
        id: Date.now(),
        ...product,
        createdAt: new Date().toISOString(),
    };

    const updated = [newProduct, ...products];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return newProduct;
};

export const deleteProduct = (id) => {
    const products = getProducts();

    const updated = products.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return updated;
};

export const updateProduct = (updatedData) => {
    const {id} = updatedData

    const products = getProducts();

    const updated = products.map((p) =>
        p.id === id ? {...p, ...updatedData} : p
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return updated;
};

export const getProductById = (id) => {
    const products = getProducts();
    return products.find((p) => p.id === id);
};