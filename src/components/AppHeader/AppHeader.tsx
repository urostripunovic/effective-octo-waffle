import styles from './AppHeader.module.css'
import logo from '../../assets/quickbutik-full-color.svg'
import classNames from 'classnames'

export interface AppHeaderProps {}

export function AppHeader({}: AppHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={classNames("container", styles.container)}>
        <img alt="Quickbutik logo" src={logo} className={styles.logo} />
      </div>
    </header>
  )
}
