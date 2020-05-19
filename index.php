<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="style.css"/>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script type="text/javascript" src="script.js"></script>
	</head>
	<body>
		<div id="text-content" style="display: none;">
			<div class="text-stream-set"><?php
				$stream_set = require('content/text-streams.php');
				foreach ($stream_set as $stream) echo "<div class=\"text-stream\">$stream</div>";
			?></div>
		</div>
		<div class="layer text-stream-set faded"></div>
		<!--<div class="layer halo">
			<div class="halo-wrapper">
				<div class="ratio">
					<div class="part part1"><div class="halo"></div></div>
					<div class="part part2"><div class="halo"></div></div>
					<div class="content book-content">
						
						
						
						
					</div>
				</div>
			</div>
		</div>-->
		
		<div class="content">
			<div class="pane">
				<div class="section intro centered">
					<h1>Nicholas Maes Books</h1>
					<p>Nicholas Maes is a Toronto-based author. His unique and thrilling novels span a wide variety of topics and reach out to a diverse range of age groups.</p>
					<p>Discover this author and delve into the fascinating worlds that exist within his works.</p>
				</div>
				<div class="section books separate">
					<h1>Books</h1><?php
					$book_data_set = require('content/book-content.php');
					$left = true;
					foreach ($book_data_set as $book_name => $book_data) {
						?>
						<div class="book split <?php echo $book_name; ?> <?php echo $left ? 'left' : 'right'; ?>">
							<div class="overview longer">
								<div class="metadata">
									<h1><?php echo $book_data['title']; ?></h1>
								</div>
								<div class="lines"><?php
								$overview_line_set = $book_data['overview'];
								foreach ($overview_line_set as $overview_line) echo '<div class="line">'.$overview_line.'</div>';
								?></div>
							</div>
							<div class="image-wrapper1 shorter"><div class="image-wrapper2">
								<div class="image <?php echo $book_name; ?>"></div><?php
								if (isset($book_data['link'])) { ?><a class="fill" href="<?php echo $book_data['link']; ?>" target="_blank">Book link</a><?php } ?>
							</div></div>
						</div>
						<?php
						$left = !$left;
					}
				?></div>
				<div class="section bio">
					<div class="split">
						<div class="shorter">
							<img src="assets/img/bio-photo.jpg" alt="author photo"/>
						</div>
						<div class="longer">
							<p>
								Nicholas Maes is a compulsive scribbler. He is also a classicist (Greek and Latin) and teaches history on
								the high school level. He lives in Toronto with his family who, when they read his novels, always want to 
								know whether he's based some of the characters on them. So long as he is able to see and move a 
								pencil (or type at a keyboard) he predicts that he'll be writing till he draws his final breath.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>