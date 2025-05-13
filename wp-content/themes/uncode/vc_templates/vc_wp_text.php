<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/**
 * Shortcode attributes
 * @var $atts
 * @var $title
 * @var $live_search
 * @var $el_class
 * Shortcode class
 * @var $this WPBakeryShortCode_VC_Wp_Text
 */
$output = '';

extract(shortcode_atts(array(
	'title' => '',
	'text' => '',
	'el_id' => '',
	'el_class' => '',
	'use_widget_style' => '',
	'widget_style_no_separator' => '',
	'widget_desktop_collapse' => '',
	'widget_collapse' => '',
	'widget_collapse_tablet' => '',
	'widget_collapse_icon' => '',
	'widget_style_title_typography' => '',
), $atts));

$atts['filter'] = true; // Hack to make sure that <p> added

$content = apply_filters( 'vc_wp_text_widget_shortcode', $content );
if ( strlen( $content ) > 0 ) {
	$atts['text'] = $content;
}

if ( $el_id !== '' ) {
	$el_id = ' id="' . esc_attr( trim( $el_id ) ) . '"';
} else {
	$el_id = '';
}

$el_class = $this->getExtraClass( $el_class );

if ( $use_widget_style === 'yes' && $widget_style_no_separator === 'yes' ) {
	$el_class .= ' widget-no-separator';
}

$widget_open = $widget_is_collapse = '';
$_args = array();
if ( $use_widget_style === 'yes' ) {
	$widget_class = '';
	if ( $widget_desktop_collapse === 'yes' ) {
		$widget_is_collapse = ' widget-collapse';
		$widget_class .= ' widget-desktop-collapse';
	} elseif ( $widget_desktop_collapse === 'click' ) {
		$widget_is_collapse = ' widget-collapse';
		$widget_class .= ' widget-desktop-collapse widget-desktop-collapse-open';
		$widget_open = ' open';
	}

	if ( $widget_collapse === 'yes' ) {
		$widget_is_collapse = ' widget-collapse';
		$widget_class .= ' widget-mobile-collapse';
	} elseif ( $widget_collapse === 'click' ) {
		$widget_is_collapse = ' widget-collapse';
		$widget_class .= ' widget-mobile-collapse widget-mobile-collapse-open';
		$widget_open = ' open';
	}

	if ( $widget_collapse_tablet === 'yes' ) {
		$widget_is_collapse = ' widget-collapse';
		$widget_class .= ' widget-tablet-collapse';
	} elseif ( $widget_collapse_tablet === 'click' ) {
		$widget_is_collapse = ' widget-collapse';
		$widget_class .= ' widget-tablet-collapse widget-tablet-collapse-open';
		$widget_open = ' open';
	} else {
		$widget_class .= ' widget-no-tablet-collapse';
	}

	$widget_class .= ' widget-collaps-icon' . $widget_collapse_icon;

	$el_class .= $widget_is_collapse . $widget_class;
	if ( $widget_is_collapse !== '' ) {
		$tag = apply_filters( 'uncode_widget_title_tag', 'h3' );
		$_args['after_widget'] = '</div></aside>';
		$_args['after_title'] = '</' . $tag . '><div class="widget-collapse-content">';
	}
}

if ( $use_widget_style === 'yes' && $widget_style_title_typography ) {
	$el_class .= ' widget-typography-' . $widget_style_title_typography;
}

$widget_unique_id = uncode_get_widget_module_id();

$output = '<div class="vc_wp_text wpb_content_element' . esc_attr( $el_class ) . '" ' . $el_id . ' data-id="' . esc_attr( $widget_unique_id ) . '">';
$type = 'WP_Widget_Text';
global $wp_widget_factory;
// to avoid unwanted warnings let's check before using widget
if ( is_object( $wp_widget_factory ) && isset( $wp_widget_factory->widgets, $wp_widget_factory->widgets[ $type ] ) ) {
	ob_start();
	$args = $use_widget_style === 'yes' ? uncode_get_default_widget_args( 'text', $_args ) : array();
	the_widget( $type, $atts, $args );
	$widget = ob_get_clean();
	if ( $use_widget_style === 'yes' && $widget_collapse === 'yes' ) {
		$widget = uncode_add_default_widget_title( $widget, false, esc_html__( 'Text', 'uncode' ) );
	}
	$output .= $widget;
	$output .= '</div>';

	echo uncode_switch_stock_string( $output );
}
