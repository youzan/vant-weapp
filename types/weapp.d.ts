type BehaviorOptions = {
  [key: string]: any & ThisType<any>
};

type WX = {
  [key: string]: any
};

declare const wx: WX;
declare function Behavior(options: BehaviorOptions): void;
declare function Component(options: any): void;
declare function getCurrentPages(): Weapp.Page[];

declare namespace Weapp {
  interface Component {
    [key: string]: any;
    getRelationNodes(selector: string): any[];
    setData(data: any, callback?: Function): void;
  }

  interface FormField {
    data: {
      name: string;
      value: any;
    }
  }

  interface Target {
    id: string;
    tagName: string;
    dataset: any;
  }

  interface Event {
    type: string;
    detail: any;
    timeStamp: number;
    target: Target;
    currentTarget: Target;
  }

  interface Touch {
    identifier: number;
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
  }

  interface TouchEvent extends Event {
    touches: Array<Touch>;
    changedTouches: Array<Touch>;
  }

  interface Page {
    selectComponent(selector: string): Component
  }
}
