<?php

$title = $media = $col_width = $mobile_width = $medium_width = $media_width_use_pixel = $media_width_percent = $media_width_pixel = $media_ratio = $media_lightbox = $media_poster = $media_link = $advanced = $media_items = $media_text = $media_style = $media_back_color = $media_overlay_color = $media_overlay_coloration = $media_overlay_color_blend = $media_overlay_opacity = $media_text_visible = $media_text_anim = $media_text_anim_type = $media_overlay_visible = $media_overlay_anim = $media_image_coloration = $media_image_color_anim = $media_image_anim = $media_image_magnetic = $media_h_align = $media_v_position = $media_image_scroll = $media_image_scroll_val = $media_reduced = $media_h_position = $media_padding = $media_text_reduced = $media_title_custom = $media_caption_custom = $media_title_transform = $media_title_dimension = $media_title_family = $media_title_weight = $media_title_height = $media_title_space = $media_subtitle_custom = $media_icon = $media_elements_click = $lbox_skin = $lbox_transparency = $lbox_dir = $lbox_title = $lbox_caption = $lbox_social = $lbox_deep = $lbox_deep_id = $lbox_no_tmb = $lbox_no_arrows = $lbox_gallery_arrows = $lbox_gallery_arrows_bg = $lbox_zoom_origin = $lbox_connected = $lbox_actual_size = $lbox_full = $lbox_download = $lbox_counter = $lbox_transition = $link = $alignment = $el_id = $el_class = $css_animation = $animation_delay = $animation_speed = $skew = $rotating = $shape = $radius = $caption = $border = $shadow = $shadow_weight = $shadow_darker = $output = $single_width = $single_height = $single_fixed = $style_preset = $css = $div_data = $lightbox_classes = $dummy_oembed = $carousel_textual = $media_code = $text_lead = $dynamic = $dynamic_source = $custom_cursor = $advanced_videos = $play_hover = $play_pause = $mobile_videos = $lb_video_advanced = $lb_autoplay = $lb_muted = $heading_custom_size = $media_image_scroll = $media_image_scroll_val = $animation_easing = $media_mask_direction = $bg_delay = $no_lazy = '';

extract(shortcode_atts(array(
	'uncode_shortcode_id' => '',
	'title' => '',
	'image' => '',
	'media' => '',
	'col_width' => '12',
	'mobile_width' => '',
	'medium_width' => '',
	'media_width_use_pixel' => '',
	'media_width_percent' => 100,
	'media_width_pixel' => '',
	'media_ratio' => '',
	'media_lightbox' => false,
	'media_poster' => '',
	'media_link' => '',
	'advanced' => false,
	'media_items' => 'media',
	'media_text' => 'overlay',
	'media_style' => 'light',
	'media_back_color' => '',
	'media_back_color_type' => '',
	'media_back_color_solid' => '',
	'media_back_color_gradient' => '',
	'media_overlay_color' => '',
	'media_overlay_color_type' => '',
	'media_overlay_color_solid' => '',
	'media_overlay_color_gradient' => '',
	'media_overlay_coloration' => '',
	'media_overlay_color_blend' => '',
	'media_overlay_opacity' => 50,
	'media_text_visible' => 'no',
	'media_text_anim' => 'yes',
	'media_text_anim_type' => '',
	'media_overlay_visible' => 'no',
	'media_overlay_anim' => 'yes',
	'media_image_coloration' => '',
	'media_image_color_anim' => '',
	'media_image_anim' => 'yes',
	'media_image_magnetic' => '',
	'media_h_align' => 'left',
	'media_v_position' => '',
	'media_image_scroll' => 'parallax',
	'media_image_scroll_val' => 5,
	'media_reduced' => '',
	'media_h_position' => 'left',
	'media_image_scroll' => 'parallax',
	'media_image_scroll_val' => 5,
	'media_padding' => '',
	'media_text_reduced' => '',
	'media_title_custom' => '',
	'media_title_transform' => '',
	'animation_easing' => '',
	'media_mask_direction' => '',
	'bg_delay' => '',
	'media_title_dimension' => '',
	'heading_custom_size' => '',
	'media_title_family' => '',
	'media_title_weight' => '',
	'media_title_height' => '',
	'media_title_space' => '',
	'media_subtitle_custom' => '',
	'media_caption_custom' => '',
	'media_icon' => '',
	'media_elements_click' => '',
	'lbox_skin' => '',
	'lbox_transparency' => '',
	'lbox_dir' => '',
	'lbox_title' => '',
	'lbox_caption' => '',
	'lbox_social' => '',
	'lbox_deep' => '',
	'lbox_deep_id' => '',
	'lbox_no_tmb' => '',
	'lbox_no_arrows' => '',
	'lbox_gallery_arrows' => '',
	'lbox_gallery_arrows_bg' => '',
	'lbox_zoom_origin' => '',
	'lbox_connected' => '',
	'lbox_actual_size' => '',
	'lbox_full' => '',
	'lbox_download' => '',
	'lbox_counter' => '',
	'lbox_transition' => '',
	'no_double_tap' => '',
	'link' => '',
	'alignment' => 'left',
	'el_id' => '',
	'el_class' => '',
	'css_animation' => '',
	'animation_delay' => '',
	'animation_speed' => '',
	'skew' => '',
	'rotating' => '',
	'parallax_intensity' => '',
	'parallax_centered' => '',
	'shape' => '',
	'radius' => '',
	'caption' => '',
	'border' => '',
	'shadow' => '',
	'shadow_weight' => '',
	'shadow_darker' => '',
	'shadow_darker' => '',
	'text_lead' => '',
	'media_meta_custom_typo' => '',
	'media_meta_size' => '',
	'media_meta_weight' => '',
	'media_meta_transform' => '',
	'dynamic' => '',
	'dynamic_source' => '',
	'custom_cursor' => '',
	'custom_tooltip' => '',
	'cursor_title' => '',
	'cursor_title_boing' => '',
	'hide_cursor_bg' => '',
	'hide_title_tooltip' => '',
	'tooltip_class' => '',
	'advanced_videos' => '',
	'play_hover' => '',
	'play_pause' => '',
	'mobile_videos' => '',
	'lb_video_advanced' => '',
	'lb_autoplay' => '',
	'lb_muted' => '',
	'desktop_visibility' => '',
	'medium_visibility' => '',
	'mobile_visibility' => '',
	'no_lazy' => ''
) , $atts));

if ( $el_id !== '' ) {
	$el_id = ' id="' . esc_attr( trim( $el_id ) ) . '"';
} else {
	$el_id = '';
}

$inline_style_css = uncode_get_dynamic_colors_css_from_shortcode( array(
	'type'       => 'vc_single_image',
	'id'         => $uncode_shortcode_id,
	'attributes' => array(
		'media_back_color'             => $media_back_color,
		'media_back_color_type'        => $media_back_color_type,
		'media_back_color_solid'       => $media_back_color_solid,
		'media_back_color_gradient'    => $media_back_color_gradient,
		'media_overlay_color'          => $media_overlay_color,
		'media_overlay_color_type'     => $media_overlay_color_type,
		'media_overlay_color_solid'    => $media_overlay_color_solid,
		'media_overlay_color_gradient' => $media_overlay_color_gradient,
	)
) );

$lbox_enhance = get_option( 'uncode_core_settings_opt_lightbox_enhance' ) === 'on';

$media_back_color = uncode_get_shortcode_color_attribute_value( 'media_back_color', $uncode_shortcode_id, $media_back_color_type, $media_back_color, $media_back_color_solid, $media_back_color_gradient );
$media_overlay_color = uncode_get_shortcode_color_attribute_value( 'media_overlay_color', $uncode_shortcode_id, $media_overlay_color_type, $media_overlay_color, $media_overlay_color_solid, $media_overlay_color_gradient );

$stylesArray = array(
    'light',
    'dark'
);

global $lightbox_id, $previous_blend;

$lazy = uncode_dynamic_srcset_lazy_loading_enabled();
if ( $no_lazy === 'yes' && $lazy === true ) {
	add_filter( 'uncode_dynamic_srcset_lazy_loading_enabled', '__return_false' );
}

if ($desktop_visibility === 'yes') {
	$resp_classes[] = 'desktop-hidden';
}
if ($medium_visibility === 'yes') {
	$resp_classes[] = 'tablet-hidden';
}
if ($mobile_visibility === 'yes') {
	$resp_classes[] = 'mobile-hidden';
}

$resp_classes[] = $this->getExtraClass($el_class);

$el_class = esc_attr(trim(implode( ' ', $resp_classes )));

$media = apply_filters( 'wpml_object_id', intval( $media ), 'attachment', true );

if ($image !== '' && $media == '') {
	$media = $image;
}

if ( $dynamic !== '' ) {
	$post_id = get_the_ID();
	if ( is_tax() ) {
		$termi_id = get_queried_object_id();
		$d_media = uncode_get_term_featured_thumbnail_id( $termi_id, 'featured' );
	} elseif ( class_exists( 'WooCommerce' ) && is_shop() ) {
		$shop_id = wc_get_page_id( 'shop' );
		$d_media = get_post_thumbnail_id($shop_id);
	} else {
		$d_media = get_post_thumbnail_id();
	}
	$d_media = apply_filters( 'uncode_featured_image_id', $d_media, $post_id );

	if ( $dynamic_source === 'secondary' ) {
		if ( is_tax() ) {
			$secondary_id = uncode_get_term_featured_thumbnail_id( $termi_id, true );
		} else {
			$secondary_id = uncode_get_secondary_featured_thumbnail_id( $post_id );
		}

		if ( $secondary_id ) {
			$d_media = $secondary_id;
		}
	}

	if ( apply_filters( 'uncode_single_show_placeholder', $d_media, $post_id ) ) {
		$media = $d_media;
	}
}

$multiple = false;
$medias = explode(',', $media);
if (count($medias) > 1 ) {
	$multiple = true;
}
$media_link = ( $media_link == '||' ) ? '' : $media_link;
$media_link = vc_build_link( $media_link );
$a_href = $media_link['url'];
$a_title = $media_link['title'];
$a_target = $media_link['target'];
$a_rel = $media_link['rel'];

$alignment = ' text-' . $alignment;

$css_class = apply_filters(VC_SHORTCODE_CUSTOM_CSS_FILTER_TAG, 'uncode-single-media ' . $el_class , $this->settings['base'], $atts);

$css_class .= $alignment;

if ($media_width_use_pixel === 'yes' && $media_width_pixel !== '') {
	$media_width = preg_replace("/[^0-9,.]/", "", $media_width_pixel);
	$single_width = $media_width;
	$actual_width = $media_width_pixel. 'px';
	$single_fixed = 'width';
} else {
	$media_width_percent = absint( $media_width_percent ? $media_width_percent : 0 );
	$single_width = ($col_width * $media_width_percent) / 100;
	$actual_width = $media_width_percent . '%';
}

$block_data = array();
$block_data['template'] = 'vc_single_image';
$block_classes = array('tmb');
$tmb_data = array();
$title_classes = array();
$resp_classes = array();

if ( $radius !== '' && $shape === 'img-round' ) {
	$shape .= ' img-round-' . $radius;
}

$shape = $tmb_shape = ($shape != '') ? ' ' . $shape : '';

if ($border === 'yes') {
	$shape .= ' img-thumbnail';
	$tmb_shape .= ' tmb-bordered';
}

if ($shadow === 'yes') {

	$tmb_shape .= ' tmb-shadowed';
	if ( $shadow_weight === '' ) {
		$shadow_weight = 'none';
	}
	if ( $shadow_darker !== '' ) {
		$shadow_weight = 'darker-' . $shadow_weight;
	}
	$tmb_shape .= ' tmb-shadowed-' . $shadow_weight;

}


$block_classes[] = 'tmb-' . $media_style;
$overlay_style = $stylesArray[!array_search($media_style, $stylesArray) ];

if ($media_overlay_color === '') {
	$media_overlay_color = 'style-'.$overlay_style.'-bg';
} else {
	$media_overlay_color .= ' style-' . $media_overlay_color .'-bg';
}

switch ($media_overlay_coloration) {
	case 'top_gradient':
		$block_classes[] = 'tmb-overlay-gradient-top';
	break;
	case 'bottom_gradient':
		$block_classes[] = 'tmb-overlay-gradient-bottom';
	break;
}

$media_attributes = uncode_get_media_info($media);
if ( isset($media_attributes->post_mime_type) ) {
	$consent_id = str_replace( 'oembed/', '', $media_attributes->post_mime_type );
}

if ( isset($consent_id) && uncode_privacy_allow_content( $consent_id ) === false ) {
	$advanced = 'yes';
}

if ($advanced === 'yes' ) {
	if ($media_text_visible === 'yes') {
		$block_classes[] = 'tmb-text-showed';
	}
	if ($media_text_anim === 'yes') {
		$block_classes[] = 'tmb-overlay-text-anim';
	}
	if ($media_text_anim_type === 'btt') {
		$block_classes[] = 'tmb-reveal-bottom';
	}
	if ($media_overlay_visible === 'yes') {
		$block_classes[] = 'tmb-overlay-showed';
	}
	if ($media_overlay_anim === 'yes') {
		$block_classes[] = 'tmb-overlay-anim';
	}
	if ($media_image_coloration === 'desaturated') {
		$block_classes[] = 'tmb-desaturated';
	}
	if ($media_image_color_anim === 'yes') {
		$block_classes[] = 'tmb-image-color-anim';
	}
	if ($media_text === 'overlay') {
	    if ($media_reduced !== '') {
	        switch ($media_reduced) {
	            case 'three_quarter':
	                $block_classes[] = 'tmb-overlay-text-reduced';
	                break;
	            case 'half':
	                $block_classes[] = 'tmb-overlay-text-reduced-2';
	                break;
	        }
	        if ($media_h_position !== '') {
	        	$block_classes[] = 'tmb-overlay-' . $media_h_position;
	        }
	    } else {
	    	$block_data['media_full_width'] = true;
	    }
	    if ($media_v_position !== '') {
	    	$block_classes[] = 'tmb-overlay-' . $media_v_position;
	    }
	    if ($media_h_align !== '') {
	    	$block_classes[] = 'tmb-overlay-text-' . $media_h_align;
	    }
	} else {
	    $block_classes[] = 'tmb-content-' . $media_h_align;
	}

	if ($media_text_reduced === 'yes') {
		$block_classes[] = 'tmb-text-space-reduced';
	}
	if ($media_image_anim === 'yes' && $carousel_textual !== 'yes') {
		if ( $media_image_magnetic === 'yes' ) {
			$block_classes[] = 'tmb-image-anim-magnetic';
		} else {
			$block_classes[] = 'tmb-image-anim';
		}
	}
	if ($media_title_transform !== '') {
		$block_classes[] = 'tmb-entry-title-' . $media_title_transform;
	}
	if ($media_title_dimension !== '') {
		$title_classes[] = $media_title_dimension;
		if ( $media_title_dimension === 'custom' && $heading_custom_size !== '' ) {
			$title_classes[] = 'fontsize-' . $uncode_shortcode_id . '-custom';
			$inline_style_css .= uncode_get_dynamic_css_font_size_shortcode( array(
				'id'         => $uncode_shortcode_id,
				'font_size'  => $heading_custom_size
			) );
		}
	} else {
		$title_classes[] = 'h6';
	}
	if ($media_title_family !== '') {
		$title_classes[] = $media_title_family;
	}
	if ($media_title_weight !== '') {
		$title_classes[] = 'font-weight-' . $media_title_weight;
	}
	if ($media_title_height !== '') {
		$title_classes[] = $media_title_height;
	}
	if ($media_title_space !== '') {
		$title_classes[] = $media_title_space;
	}
}

if ($advanced !== 'on') {
	$block_classes[] = $tmb_shape;
}
if ($no_double_tap === 'yes') {
	$block_classes[] = 'tmb-no-double-tap';
}

if ( $css_animation === 'mask' || ($advanced === 'yes' && $media_image_anim === 'scroll') ) {
	$block_classes[] = 'tmb-mask';

	if ( $css_animation === 'mask' ) {
		$block_classes[] = 'tmb-mask-reveal';
		if ($animation_delay !== '') {
			$tmb_data['data-delay'] = $animation_delay;
		}
		if ($animation_speed !== '') {
			$tmb_data['data-speed'] = $animation_speed;
		}
		if ($animation_easing !== '') {
			$tmb_data['data-easing'] = $animation_easing;
		}
		if ($media_mask_direction !== '') {
			$block_classes[] = 'tmb-mask-reveal-' . $media_mask_direction;
		}
		if ($bg_delay !== '') {
			$tmb_data['data-bg-delay'] = $bg_delay;
		}
	}

	if ($advanced === 'yes' && $media_image_anim === 'scroll') {
		$block_classes[] = 'tmb-mask-scroll';
		$block_classes[] = 'tmb-mask-scroll-' . esc_attr($media_image_scroll);
		$tmb_data['data-scroll-val'] = intval( $media_image_scroll_val );
	}

	if ( $css_animation === 'mask' ) {
		$hex_color = get_post_meta($media, '_uncode_hex_val', true);
		if ( $hex_color ) {
			$block_classes[] = 'tmb-has-hex';
			$block_data['hex'] = $hex_color;
		}
	}
}

if ( $advanced === 'yes' && $media_meta_custom_typo === 'yes' ) {
	if ( $media_meta_size !== '' ) {
		$block_classes[] = 'tmb-meta-size-' . $media_meta_size;
	}

	if ( $media_meta_weight !== '' ) {
		$block_classes[] = 'tmb-meta-weight-' . $media_meta_weight;
	}

	if ( $media_meta_transform !== '' ) {
		$block_classes[] = 'tmb-meta-transform-' . $media_meta_transform;
	}
}

$block_data['classes'] = $block_classes;
$block_data['tmb_data'] = $tmb_data;
$block_data['media_id'] = $media;
$block_data['images_size'] = $media_ratio;
$block_data['single_style'] = $media_style;
$block_data['single_text'] = $media_text;
$block_data['single_elements_click'] = $media_elements_click;
$block_data['overlay_color'] = $media_overlay_color;
$block_data['overlay_opacity'] = $media_overlay_opacity;
$block_data['overlay_opacity'] = $media_overlay_opacity;
$block_data['overlay_blend'] = $media_overlay_color_blend;
$block_data['single_back_color'] = $media_back_color;
$block_data['single_width'] = $single_width;
$block_data['single_height'] = $single_height;
$block_data['single_fixed'] = $single_fixed;
$block_data['single_icon'] = $media_icon;
$block_data['media_title_custom'] = $media_title_custom;
$block_data['title_classes'] = $title_classes;
$block_data['media_subtitle_custom'] = $media_subtitle_custom;
$block_data['media_caption_custom'] = $media_caption_custom;

if ( $media_overlay_color_blend !== '' ) {
	$back_array['mix-blend-mode'] = $media_overlay_color_blend;
	$previous_blend = true;
}

switch ($media_padding) {
	case 0:
		$block_data['text_padding'] = 'no-block-padding';
	break;
	case 1:
		$block_data['text_padding'] = 'half-block-padding';
	break;
	case 2:
	default:
		$block_data['text_padding'] = 'single-block-padding';
	break;
	case 3:
		$block_data['text_padding'] = 'double-block-padding';
	break;
	case 4:
		$block_data['text_padding'] = 'triple-block-padding';
	break;
	case 5:
		$block_data['text_padding'] = 'quad-block-padding';
	break;
}

if ($css_animation !== '' && uncode_animations_enabled()) {
	if ( $css_animation === 'parallax' ) {
		$css_class .= ' parallax-el';
		$div_data .= uncode_get_parallax_div_data( $parallax_intensity, $parallax_centered, true );
	} elseif ( $css_animation !== '' && $css_animation !== 'mask' ) {
		$css_class .= ' animate_when_almost_visible ' . $css_animation;
		if ($animation_delay !== '') {
			$div_data .= ' data-delay="' . esc_attr( $animation_delay ) . '"';
		}
		if ($animation_speed !== '') {
			$div_data .= ' data-speed="' . esc_attr( $animation_speed ) . '"';
		}
	}
}

if ( $custom_cursor !== '' ) {

	$div_data .= ' data-cursor="icon-' . esc_attr( $custom_cursor ) . '"';

	if ( $cursor_title === 'yes' ) {
		$div_data .= ' data-cursor-title="true"';
		if ( $hide_cursor_bg === 'yes' ) {
			$div_data .= ' data-cursor-transparent="true"';
		}
		if ($tooltip_class !== '') {
			$div_data .= ' data-cursor-transparent="' . $tooltip_class . '"';
		}
		if ( $custom_tooltip !== '' ) {
			$div_data .= ' data-tooltip-text="' . wp_kses_post( $custom_tooltip ) . '"';
		}
		if ( $hide_title_tooltip !== '' ) {
			$block_data['classes'][] = 'show-title-' . esc_attr( $hide_title_tooltip );
		} else {
			$block_data['classes'][] = 'hide-title-tooltip';
		}
		if ( $cursor_title_boing !== '' ) {
			$div_data .= ' data-cursor-cursor="boing"';
		}
	}
}


if ( $lbox_enhance && $lbox_deep === 'yes' && $lbox_deep_id !== '') {
	$lightbox_id_rand = esc_attr($lbox_deep_id);
} else {
	$lightbox_id_rand = uncode_big_rand();
}

if ($media_lightbox === 'yes') {
	$lightbox_classes = array();
	if ($lbox_skin !== '') {
		$lightbox_classes['data-skin'] = $lbox_skin;
	}
	if ($lbox_title !== '') {
		$lightbox_classes['data-title'] = true;
	}
	if ($lbox_caption !== '') {
		$lightbox_classes['data-caption'] = true;
	}
	if ($lbox_transparency !== '') {
		$lightbox_classes['data-transparency'] = $lbox_transparency;
	}
	if ($lbox_dir !== '') {
		$lightbox_classes['data-dir'] = $lbox_dir;
	}
	if ($lbox_social !== '') {
		$lightbox_classes['data-social'] = true;
	}
	if ($lbox_deep !== '') {
		$lightbox_classes['data-deep'] = $media;
	}
	if ($lbox_no_tmb !== '') {
		$lightbox_classes['data-notmb'] = true;
	}
	if ($lbox_no_arrows !== '') {
		$lightbox_classes['data-noarr'] = true;
	}
	if ($lbox_gallery_arrows !== '') {
		$lightbox_classes['data-arrows'] = $lbox_gallery_arrows;
	}
	if ($lbox_gallery_arrows_bg !== '') {
		$lightbox_classes['data-arrows-bg'] = $lbox_gallery_arrows_bg;
	}
	if ($lbox_zoom_origin !== '') {
		$lightbox_classes['data-zoom-origin'] = true;
	}
	if ($lbox_actual_size !== '') {
		$lightbox_classes['data-actual-size'] = true;
	}
	if ($lbox_full !== '') {
		$lightbox_classes['data-full'] = true;
	}
	if ($lbox_download !== '') {
		$lightbox_classes['data-download'] = true;
	}
	if ($lbox_counter !== '') {
		$lightbox_classes['data-counter'] = true;
	}
	if ( $lbox_transition !== '' ) {
		$lightbox_classes['data-transition'] = esc_attr($lbox_transition);
	}
	if ( $lbox_connected !== '' ) {
		$lightbox_classes['data-connect'] = true;
	}
	if (count($lightbox_classes) === 0) {
		$lightbox_classes['data-active'] = true;
	}
	if ($lbox_connected === 'yes') {
		if (!isset($lightbox_id) || $lightbox_id === '') {
			$lightbox_id = $lightbox_id_rand;
		}
		$lbox_id = $lightbox_id;
	} else {
		if ( $lbox_enhance ) {
			$lbox_id = $lightbox_id_rand;
		} else {
			$lbox_id = $media;
		}
	}
} else {
	$lbox_id = $media;
}

if  ($text_lead === 'yes' ) {
	$block_data['text_lead'] = 'yes';
} else if ( $text_lead === 'small' ) {
	$block_data['text_lead'] = 'small';
}

$block_data['poster'] = false;

$block_data['no-control'] = false;
if ( $advanced_videos === 'yes' ) {
	$block_data['no-control'] = true;
	$block_data['play_hover'] = $play_hover;
	$block_data['play_pause'] = $play_pause;
	$block_data['mobile_videos'] = $mobile_videos;
}

if ($advanced === 'yes') {

	$layout = uncode_flatArray(vc_sorted_list_parse_value($media_items));

	if ($media_lightbox !== 'yes') {
		$lightbox_classes = array();
		if (!isset($media_link['url']) || $media_link['url'] === '') {
			$block_data['link_class'] = 'inactive-link';
			$block_data['no_href'] = true;
			$block_data['link'] = '#';
		} else {
			if ($media_link !== '') {
				$block_data['link']['url'] = $a_href;
				$block_data['link']['target'] = $a_target;
				$block_data['link']['rel'] = $a_rel;
			}
		}
	}

	if (isset($layout['media'][0]) && $layout['media'][0] === 'poster') {
		$block_data['poster'] = true;
	}
	if (isset($layout['icon'][0]) && $layout['icon'][0] !== '') {
		$block_data['icon_size'] = ' t-icon-size-' . $layout['icon'][0];
	}

	if (empty($media) || FALSE === get_post_mime_type( $media )) {
		if ( !function_exists('vc_is_page_editable') || !vc_is_page_editable() ) {
			$media_html = '<img class="uncode-missing-media" src="https://via.placeholder.com/500x500.png?text=media+not+available&amp;w=500&amp;h=500" />';
		} else {
			$media_html = '';
		}
	} else {
		if ($animation_delay !== '') {
			$block_data['delay'] = $animation_delay;
		}
		$media_html = uncode_create_single_block($block_data, 'single-' . $lbox_id, 'masonry', $layout, $lightbox_classes, $carousel_textual);
	}
	$media_string = '<div class="uncode-single-media-wrapper single-advanced">' . $media_html . '</div>';

} else {

	$dummy = '';
	$media_type = 'image';
	$style_preset = 'masonry';
	if ($media_ratio !== '') {
		$block_data['images_size'] = $media_ratio;
	}

	if ($media_lightbox !== 'yes') {
		$block_data['single_text'] = 'overlay';
		$block_data['single_elements_click'] = 'yes';
	}

	$layout = array('media' => array());

	if (empty($media) || FALSE === get_post_mime_type( $media )) {
		if ( !function_exists('vc_is_page_editable') || !vc_is_page_editable() ) {
			$media_html = '<div class="t-entry-visual-cont"><img class="uncode-missing-media" src="https://via.placeholder.com/500x500.png?text=media+not+available&amp;w=500&amp;h=500" /></div>';
		} else {
			$media_html = '';
		}
	} else {

		if ($media_poster === 'yes') {
			$poster = get_post_meta($media, "_uncode_poster_image", true);
			if (isset($poster) && $poster !== '') {
				$block_data['poster'] = true;
			}
		}

		if ($animation_delay !== '') {
			$block_data['delay'] = $animation_delay;
		}

		$media_html = uncode_create_single_block($block_data, 'single-' . $lbox_id, 'masonry', $layout, $lightbox_classes, $carousel_textual);

		if ( function_exists( 'uncode_vc_remove_markup_from_single_media' ) ) {
			$media_html = uncode_vc_remove_markup_from_single_media( $media_html );
		}
	}

	if ($media_lightbox === 'yes') {
		$media_string = str_replace('t-entry-visual-cont', 'uncode-single-media-wrapper' . $shape, $media_html);
		if (isset($media_attributes->post_mime_type) && $media_attributes->post_mime_type === 'oembed/iframe') {
			$media_string .= '<div id="inline-' . esc_attr( $media ) . '" class="ilightbox-html" style="display: none;">' . $media_attributes->post_content . '</div>';
		}
		if ( $lb_video_advanced === 'yes' ) {
			if ( $lb_autoplay !== '' ) {
				$media_string = preg_replace("/ class=\"(.*?)\"/", ' class="$1" data-lb-autoplay="' . $lb_autoplay . '"', $media_string);
			}
			if ( $lb_muted !== '' ) {
				$media_string = preg_replace("/ class=\"(.*?)\"/", ' class="$1" data-lb-muted="' . $lb_muted . '"', $media_string);
			}
		}

	} else {
		if (!empty($a_href)) {
			$a_target = ($a_target !== '') ? ' target="' . esc_attr( $a_target ) . '"' : '';
			$a_rel = ($a_rel !== '') ? ' rel="' . esc_attr( $a_rel ) . '"' : '';
			$a_title = ($a_title !== '') ? ' title="' . esc_attr( $a_title ) . '"' : '';
			$media_string = '<a class="single-media-link" href="' . esc_attr( $a_href ) . '"'.$a_target.$a_rel.$a_title.'>' . $media_string = str_replace('t-entry-visual-cont', 'uncode-single-media-wrapper' . $shape, $media_html) . '</a>';
		} else {
			$media_string = str_replace('t-entry-visual-cont', 'uncode-single-media-wrapper' . $shape, $media_html);
		}
	}
}

if ( $skew === 'yes' ) {
	$media_string = '<div class="uncode-skew">' . $media_string . '</div>';
}

if ( $rotating !== '' ) {
	$rotate_class = 'uncode-rotate uncode-rotate-' . $rotating;
	$media_string = '<div class="' . $rotate_class . '">' . $media_string . '</div>';
}

$output.= '<div class="' . esc_attr($css_class) . '"' . $div_data . $el_id . '>';
$output.= '<div class="single-wrapper" style="max-width: ' . esc_attr( $actual_width ) . ';'.$dummy_oembed.'">';
$output.= wpb_widget_title(array('title' => $title,'extraclass' => 'wpb_singleimage_heading'));
$output.= $media_string;
$output.= '</div>';
if ($caption === 'yes') {
	if ( isset($media_attributes->post_excerpt) && $media_attributes->post_excerpt !== '' ) {
		$output.= '<figcaption>'.$media_attributes->post_excerpt.'</figcaption>';
	}
}
$output .= uncode_print_dynamic_inline_style( $inline_style_css );
$output.= '</div>';

echo uncode_remove_p_tag($output);
if ( $no_lazy === 'yes' && $lazy === true ) {
	add_filter( 'uncode_dynamic_srcset_lazy_loading_enabled', '__return_true' );
}
