import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <section className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 min-w-[320px]">
          <h1 className=" m-auto text-[4rem] font-bold ">Error</h1>
          <div className="whitespace-pre-line">
            알 수 없는 에러가 발생했습니다.
            <br />
            올바른 동작인지 다시 한번 확인해주세요.
          </div>
          <br />
          <a className="mt-6 text-blue-500" href="/">
            홈으로 돌아가기
          </a>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
