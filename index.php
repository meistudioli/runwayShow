<?php
require_once './libs/cls_ga.php';

$dataSet = array(
	array(
		'link' => 'https://www.amazon.com/Anne-Klein-Womens-Shantung-Mariner/dp/B01FWFW942/ref=lp_1045024_1_27?s=apparel&ie=UTF8&qid=1469687385&sr=1-27&nodeID=1045024',
		'title' => 'Anne Klein Women\'s Slub Shantung Vneck Fit and Flare',
		'target' => 'amazon',
		'poster' => 'img/runwayShow/runway-show-0.png',
		'triggerByHover' => false,
		'source' => array(
			'src' => './video/runway-show-0.mp4',
			'type' => 'mp4'
		)
	),
	array(
		'link' => 'https://www.amazon.com/Joie-Foxleyboho-Printed-Georgette-Vintage/dp/B01H045CME/ref=sr_1_1?m=ATVPDKIKX0DER&s=apparel&ie=UTF8&qid=1469611493&sr=1-1&nodeID=2346727011&refinements=p_6%3AATVPDKIKX0DER',
		'title' => 'Joie Women\'s Foxleyboho Block Printed Silk Georgette 12mm',
		'target' => 'amazon',
		'poster' => 'img/runwayShow/runway-show-1.jpg',
		'posterHiRes' => 'img/runwayShow/runway-show-1-hi.jpg',
		'aspect' => 'left',
		'triggerByHover' => false,
		'source' => array(
			'src' => './video/runway-show-1.mp4',
			'type' => 'mp4'
		)
	),
	array(
		'link' => 'https://www.amazon.com/Ivanka-Trump-Womens-Organza-Ivory/dp/B01DR153E6/ref=sr_1_54?m=ATVPDKIKX0DER&s=apparel&ie=UTF8&qid=1469610956&sr=1-54&nodeID=2346728011&refinements=p_6%3AATVPDKIKX0DER',
		'title' => 'Ivanka Trump Women\'s Organza with Belt',
		'target' => 'amazon',
		'poster' => 'img/runwayShow/runway-show-2.jpg',
		'posterHiRes' => 'img/runwayShow/runway-show-2-hi.jpg',
		'triggerByHover' => false,
		'source' => array(
			'src' => './video/runway-show-2.mp4',
			'type' => 'mp4'
		)
	),
	array(
		'link' => 'https://www.amazon.com/Lark-Ro-Womens-Sleeve-Graphic/dp/B014C0BM1Y/ref=lp_13895223011_1_10?s=apparel&ie=UTF8&qid=1469611524&sr=1-10&nodeID=13895223011',
		'title' => 'Lark & Ro Women\'s Short Sleeve Graphic Lace Fit and Flare Dress',
		'target' => 'amazon',
		'poster' => 'img/runwayShow/runway-show-3.jpg',
		'posterHiRes' => 'img/runwayShow/runway-show-3-hi.jpg',
		'triggerByHover' => false,
		'source' => array(
			'src' => './video/runway-show-3.mp4',
			'type' => 'mp4'
		)
	),
	array(
		'link' => 'https://www.amazon.com/Eliza-Womens-Floral-Sleeveless-Flare/dp/B01HEHSQ52/ref=sr_1_27?m=ATVPDKIKX0DER&s=apparel&ie=UTF8&qid=1469611865&sr=1-27&nodeID=11006703011&refinements=p_6%3AATVPDKIKX0DER',
		'title' => 'Eliza J Women\'s Floral Sleeveless Fit and Flare Dress',
		'target' => 'amazon',
		'poster' => 'img/runwayShow/runway-show-4.jpg',
		'posterHiRes' => 'img/runwayShow/runway-show-4-hi.jpg',
		'aspect' => 'right',
		'zoom' => '2.2',
		'triggerByHover' => false,
		'videoHiRes' => './video/runway-show-4.mp4',
		'source' => array(
			'src' => './video/runway-show-4.mp4',
			'type' => 'mp4'
		)
	)
);

shuffle($dataSet);
$dataConf0 = ' data-conf=\''.htmlspecialchars(json_encode($dataSet[0]), ENT_QUOTES, 'UTF-8').'\'';
$dataConf1 = ' data-conf=\''.htmlspecialchars(json_encode($dataSet[1]), ENT_QUOTES, 'UTF-8').'\'';

$gaData = array(
	'trackingID' => 'UA-74300583-1',
	'customDefinitions' => array(
		'document_group' => 'runway show prototype'
	)
);
$ga = new GA();
$ga = $ga->genConf($gaData);
?>
<!DOCTYPE html>
<html lang="en" x-frame-options="sameorigin">
<head>
<meta http-equiv="Content-Security-Policy1" content="default-src 'self'; font-src * data:; style-src 'self' 'unsafe-inline';">
<meta http-equiv="CACHE-CONTROL" content="NO-CACHE">
<meta http-equiv="PRAGMA" content="NO-CACHE">
<meta http-equiv="Expires" content="Wed, 26 Feb 1997 08:21:57 GMT">
<meta http-equiv="x-frame-options" content="sameorigin">
<meta http-equiv="imagetoolbar" content="no">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<meta name="description" content="筆者非常喜愛 Amazon 的服飾 video 應用, 透過 video 詮釋, 讓 user 可以更清楚的了解的服飾穿上身後的真實呈現的狀態, 也可以避免一些不合適退貨的情況發生, 本 module 的開發除了承襲 Amazon 的 interaction 之外, 另外多了一些 feature 供 developer 作更靈活的應用, 由於是採用 fluid design, 所以不管當前的 resolution 如何變化, 都不會撼動其呈現效果, 除此之外, 更加上 i13n tracking, 讓我們可以更快速的追蹤到 user 的使用情況喔!">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@mei">
<meta name="twitter:creator" content="@mei">
<meta name="twitter:title" content="runway show - web components based Video Application">
<meta name="twitter:description" content="筆者非常喜愛 Amazon 的服飾 video 應用, 透過 video 詮釋, 讓 user 可以更清楚的了解的服飾穿上身後的真實呈現的狀態, 也可以避免一些不合適退貨的情況發生, 本 module 的開發除了承襲 Amazon 的 interaction 之外, 另外多了一些 feature 供 developer 作更靈活的應用, 由於是採用 fluid design, 所以不管當前的 resolution 如何變化, 都不會撼動其呈現效果, 除此之外, 更加上 i13n tracking, 讓我們可以更快速的追蹤到 user 的使用情況喔!">
<meta name="twitter:image:src" content="http://mei.homin.com.tw/img/preview/runwayShow.png">
<meta property="og:title" content="runway show - web components based Video Application">
<meta property="og:site_name" content="mei">
<meta property="og:description" content="筆者非常喜愛 Amazon 的服飾 video 應用, 透過 video 詮釋, 讓 user 可以更清楚的了解的服飾穿上身後的真實呈現的狀態, 也可以避免一些不合適退貨的情況發生, 本 module 的開發除了承襲 Amazon 的 interaction 之外, 另外多了一些 feature 供 developer 作更靈活的應用, 由於是採用 fluid design, 所以不管當前的 resolution 如何變化, 都不會撼動其呈現效果, 除此之外, 更加上 i13n tracking, 讓我們可以更快速的追蹤到 user 的使用情況喔!">
<meta property="og:image" content="http://mei.homin.com.tw/img/preview/runwayShow.png">
<title>runway show - web components based Video Application</title>
<link rel="dns-prefetch" href="//mei.homin.com.tw">
<link rel="canonical" href="http://mei.homin.com.tw/runwayShowPrototype.html">
<link rel="stylesheet" href="css/cssbase.css">
<link rel="stylesheet" href="css/adornFormElements.css">
<link rel="stylesheet" href="css/runway-show.css">
<script src="js/pageRender.js" data-source="js/pack-runway-show.js&js/gaExt.js&js/runWayShowInit.js"></script>
</head>

<body>
<header id="hd" role="banner">
	<h1>runway show - web components based Video Application</h1>
</header>

<main id="bd" role="main">
	<section>
		<ul class="mei-g">
			<li class="mei-u">
				<runway-show hidden>
					<h3>runway-show</h3>
					<a href="<?php echo $dataSet[0]['link']; ?>" title="<?php echo $dataSet[0]['title']; ?>" target="<?php echo $dataSet[0]['target']; ?>"<?php if (isset($dataSet[0]['triggerByHover'])) echo ' data-triggerByHover="'.json_encode($dataSet[0]['triggerByHover']).'"'; ?>>
						<video poster="<?php echo $dataSet[0]['poster']; ?>" preload="none"<?php if ($dataSet[0]['posterHiRes']) echo ' data-posterHiRes="'.$dataSet[0]['posterHiRes'].'"'; ?><?php if ($dataSet[0]['videoHiRes']) echo ' data-videoHiRes="'.$dataSet[0]['videoHiRes'].'"'; ?><?php if ($dataSet[0]['zoom']) echo ' data-zoom="'.$dataSet[0]['zoom'].'"'; ?>>
							<source src="<?php echo $dataSet[0]['source']['src']; ?>" type="video/mp4">
						</video>
					</a>
				</runway-show>
			</li>
			<li class="mei-u">
				<runway-show hidden>
					<h3>runway-show</h3>
					<a href="<?php echo $dataSet[0]['link']; ?>" title="<?php echo $dataSet[1]['title']; ?>" target="<?php echo $dataSet[1]['target']; ?>"<?php if (isset($dataSet[1]['triggerByHover'])) echo ' data-triggerByHover="'.json_encode($dataSet[1]['triggerByHover']).'"'; ?>>
						<video poster="<?php echo $dataSet[1]['poster']; ?>" preload="none"<?php if ($dataSet[1]['posterHiRes']) echo ' data-posterHiRes="'.$dataSet[1]['posterHiRes'].'"'; ?><?php if ($dataSet[1]['videoHiRes']) echo ' data-videoHiRes="'.$dataSet[1]['videoHiRes'].'"'; ?><?php if ($dataSet[0]['zoom']) echo ' data-zoom="'.$dataSet[0]['zoom'].'"'; ?>>
							<source src="<?php echo $dataSet[1]['source']['src']; ?>" type="video/mp4">
						</video>
					</a>
				</runway-show>
			</li>
		</ul>
	</section>
</main>

<footer id="ft">
	<small role="contentinfo">Powered by mei's studio.</small>
	<?php echo $ga; ?>
</footer>

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "CreativeWork",
  "name": "runway show - web components based Video Application",
  "url": "http://mei.homin.com.tw/runwayShowPrototype.php",
  "description": "筆者非常喜愛 Amazon 的服飾 video 應用, 透過 video 詮釋, 讓 user 可以更清楚的了解的服飾穿上身後的真實呈現的狀態, 也可以避免一些不合適退貨的情況發生, 本 module 的開發除了承襲 Amazon 的 interaction 之外, 另外多了一些 feature 供 developer 作更靈活的應用, 由於是採用 fluid design, 所以不管當前的 resolution 如何變化, 都不會撼動其呈現效果, 除此之外, 更加上 i13n tracking, 讓我們可以更快速的追蹤到 user 的使用情況喔!",
  "image": "http://mei.homin.com.tw/img/preview/runwayShow.png",
  "author": {
	  "@type": "Person",
	  "name": "Paul Li",
	  "jobTitle": "Front End engineer",
	  "affiliation": "mei's studio",
	  "additionalName": "mei",
	  "url": "https://www.facebook.com/mei.studio.li",
	  "image": "https://graph.facebook.com/mei.studio.li/picture",
	  "brand": "mei's studio",
	  "familyName": "Li",
	  "gender": "M",
	  "givenName": "Paul",
	  "owns": "mei's studio",
	  "worksFor": "Yahoo",
	  "description": "People who loves all front end skills"
  },
  "dateCreated": "2016-07-28",
  "datePublished": "2016-07-28",
  "genre": "web components",
  "keywords": "runwayShow,webcomponents"
}
</script>
</body>
</html>
