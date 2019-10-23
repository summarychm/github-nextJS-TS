import 'react'
declare module 'react' {
  // refer https://github.com/zeit/styled-jsx/issues/90#issuecomment-318052994
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}