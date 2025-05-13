<?php
$title = $el_id = $el_class = $value = $font = $weight = $height = $transform = $size = $prefix = $suffix = $separator = $text = $icon = $output = $css_animation = $animation_delay = $animation_speed = $counter_color = $text_italic = $text_space = $semantic = '';
extract(shortcode_atts(array(
	'uncode_shortcode_id' => '',
	'title' => '',
	'el_id' => '',
	'el_class' => '',
	'value' => '1000',
	'semantic' => 'p',
	'font' => '',
	'weight' => '',
	'height' => '',
	'transform' => '',
	'size' => 'h2',
	'heading_custom_size' => '',
	'counter_color' => '',
	'counter_color_type' => '',
	'counter_color_solid' => '',
	'prefix' => '',
	'suffix' => '',
	'separator' => '',
	'text' => '',
	'text_italic' => '',
	'text_space' => '',
	'icon' => '',
	'css_animation' => '',
	'animation_delay' => '',
	'animation_speed' => '',
) , $atts));

if ( $el_id !== '' ) {
	$el_id = ' id="' . esc_attr( trim( $el_id ) ) . '"';
} else {
	$el_id = '';
}

$inline_style_css = uncode_get_dynamic_colors_css_from_shortcode( array(
	'type'       => 'uncode_counter',
	'id'         => $uncode_shortcode_id,
	'attributes' => array(
		'counter_color'          => $counter_color,
		'counter_color_type'     => $counter_color_type,
		'counter_color_solid'    => $counter_color_solid,
		'counter_color_gradient' => false,
	)
) );

if ( $size === 'custom' && $heading_custom_size !== '' ) {
	$inline_style_css .= uncode_get_dynamic_css_font_size_shortcode( array(
		'id'         => $uncode_shortcode_id,
		'font_size'  => $heading_custom_size
	) );
}

$counter_color = uncode_get_shortcode_color_attribute_value( 'counter_color', $uncode_shortcode_id, $counter_color_type, $counter_color, $counter_color_solid, false );

$counter_class = array();
if ($font !== '') {
	$counter_class[] = $font;
}
if ($size !== '') {
	$counter_class[] = $size;
}
if ($size === 'custom' && $heading_custom_size !== '') {
	$counter_class[] = 'fontsize-' . $uncode_shortcode_id . '-custom';
}
if ($weight !== '') {
	$counter_class[] = 'font-weight-' . $weight;
}
if ($height !== '') {
	$counter_class[] = $height;
}
if ($transform !== '') {
	$counter_class[] = 'text-' . $transform;
}
if ($text_italic !== '') {
	$counter_class[] = 'text-italic';
}
if ($text_space !== '') {
	$counter_class[] = $text_space;
}
$el_class = $this->getExtraClass($el_class);
if ($text_space !== '') {
	$counter_class[] = $text_space;
}
if ($counter_color !== '') {
	$counter_color = ' text-' . $counter_color . '-color';
}

$css_class = apply_filters( VC_SHORTCODE_CUSTOM_CSS_FILTER_TAG, 'uncode-counter-wrap ', $this->settings['base'], $atts );
$classes = array( $css_class );
$classes[] = trim( $this->getExtraClass( $el_class ) );

$div_data = array();
if ($css_animation !== '' && uncode_animations_enabled()) {
	$classes[] = $css_animation . ' animate_when_almost_visible';
	if ($animation_delay !== '') {
		$div_data['data-delay'] = $animation_delay;
	}
	if ($animation_speed !== '') {
		$div_data['data-speed'] = $animation_speed;
	}
}

$div_data_attributes = array_map(function ($v, $k) { return $k . '="' . $v . '"'; }, $div_data, array_keys($div_data));

$output .= '<div class="uncode-wrapper ' . esc_attr( trim( implode( ' ', $classes ) ) ) . '" '.implode(' ', $div_data_attributes). $el_id . '>';
$output .= '<' . $semantic .'  class="' . esc_attr(trim(implode(' ', $counter_class))) . '">';
if ($prefix !== '') {
	$output .= '<span class="counter-prefix'.$counter_color.'">'.$prefix.'</span>';
}
$counter_edit = (function_exists('vc_is_page_editable') && vc_is_page_editable()) ? ' started' : '';
$output .= '<span class="uncode-counter counter' . esc_attr( $counter_color ) . esc_attr( $counter_edit ) . '" data-val="' . $value . '">' . $value . '</span>';
if ($suffix !== '') {
	$output .= '<span class="counter-suffix' . esc_attr( $counter_color ) . '">'.$suffix.'</span>';
}
$output .= '</' . $semantic .'>';
if ($separator === 'yes') {
	$output .= '<hr class="separator-break separator-accent" />';
}
if ($text !== '') {
	$output .= '<div class="counter-text"><p>'.$text.'</p></div>';
}
$output .= uncode_print_dynamic_inline_style( $inline_style_css );
$output .= '</div>';

echo uncode_remove_p_tag($output);
