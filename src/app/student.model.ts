export class Student {
    private _id: string;
    private _firstName: string;
    private _name: string;
    private _group: string;
    private _courseId: number;

    constructor(id: string, firstName: string, name: string, group: string, courseId: number) {
        this._id = id;
        this._firstName = firstName;
        this._name = name;
        this._group = group;
        this._courseId = courseId;
    }

    get id(): string { return this._id; }
    get firstName(): string { return this._firstName; }
    get name(): string { return this._name; }
    get group(): string { return this._group; }
    get courseId(): number { return this._courseId; }

    set id(id: string) {this._id = id;}
    set firstName(firstName: string) { this._firstName = firstName; }
    set name(name: string) { this._name = name; }
    set group(group: string) { this._group = group; }
    set courseId(courseId: number) { this._courseId = courseId; }
}