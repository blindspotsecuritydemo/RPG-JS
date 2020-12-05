export class Utils {

    static isObject(val) {
        return typeof val === 'object' && !Array.isArray(val)
    }

    static propertiesToArray(obj: any) {
        const addDelimiter = (a, b) =>
            a ? `${a}.${b}` : b;
    
        const paths = (obj = {}, head = '') => {
            return Object.entries(obj)
                .reduce((product, array) => 
                    {
                        const [key] = array
                        const value: any = array[1]
                        let fullPath = addDelimiter(head, key)
                        if (key[0] != '_' && (Utils.isObject(value) || Array.isArray(value))) {
                            if (Object.keys(value).length == 0) {
                                return product.concat(fullPath)
                            }
                            return product.concat(paths(value, fullPath))
                        }
                        else {
                            return product.concat(fullPath)
                        }
                    }, []);
        }
    
        return paths(obj);
    }

    static generateId() {
        return '$' + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5))
    }
}