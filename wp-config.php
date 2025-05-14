<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'wpuser1' );

/** Database password */
define( 'DB_PASSWORD', 'Wpuser@123' );

/** Database hostname */
define( 'DB_HOST', '13.232.249.29' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '%6fCrm9IAO?i_F?]~sRiPkC2 d<(8`kIqN`OOsX=RJZ{+Qqy+4~UYmxISa;Uqdmv' );
define( 'SECURE_AUTH_KEY',  '7J6^G2*4@+-i;>Lj?9Ul0Xl#{3iAZEr.mA083iGn(Gh>c][m6Mf9E8}qkMMb;8GY' );
define( 'LOGGED_IN_KEY',    '.Td>W^$o3rZ[tnnH^kR{<%.T^(}8@.(l#){B{~zz#!X| 8E23Fy?tI}l&U8;1DsL' );
define( 'NONCE_KEY',        '^.X~tadh[E7dYY#JNcQj1&zh/M:Wv^%.JoK=}oF{oAJ!#c~u.6UN84QR3c57!]l:' );
define( 'AUTH_SALT',        'mKWRA,@.Vr/)$ho,{-7N@JCFEHtcP=9b*!hdK+6z]_,>L#BW{s54/X.ML{qpQsc,' );
define( 'SECURE_AUTH_SALT', '*{BV*96~-`Zm9PP3# nu?z?WZ0,RnL%?tB~pv0ZOd2ulXd{1n5^FTVeClxx[7f R' );
define( 'LOGGED_IN_SALT',   '?o4K0 *D-~hTiS1ta?UmY51LT*NQ!JIz|W>|}CDPl4Qf.mJwlVIbHbSGham70b%r' );
define( 'NONCE_SALT',       'dk)lB3}g7j[51f:>}-1ZOP|!jhuF2@Mmx0#{tV%c-a-(!bsg2{J:pY @+pr-qa:G' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */

define('WP_MAX_INPUT_VARS', 3000);
define('WP_MAX_EXECUTION_TIME', 3000000);
define('WP_UPLOAD_MAX_FILESIZE', 4294967296);


/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';



