export async function delay() {
    return await new Promise(resolve => setTimeout(resolve, 100));
}