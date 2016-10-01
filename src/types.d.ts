// Teach typescript some things
declare function Symbol(_:string);
declare function require(path:string);
declare class Promise<T>{}

interface Document 
{
    registerElement<T>(name:string, T) : T
}