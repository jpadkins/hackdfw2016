<?php
// Routes

$app->get('/', function ($request, $response, $args) {
    // Render file upload form
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/locations/{latitude}/{longitude}', function($request, $response, $args) {
	$db = $this->dbConnection;
	$latitude = $args['latitude'];
	$longitude = $args['longitude'];
	$distance = 1;
	$query = $db->prepare("CALL GetLocations(?,?,?)");
	$query->bindParam(1,$latitude, PDO::PARAM_STR);
	$query->bindParam(2,$longitude, PDO::PARAM_STR);
	$query->bindParam(3,$distance, PDO::PARAM_STR);
	$result = $query->execute();
	$returnArray = array();
	if($result) {
		$data = $query->fetchAll();
		$response->getBody()->write(json_encode(array('locations' => $data)));
	}
	else {
		$response = $response->withStatus(400);
	}
	return $response;
});

$app->post('/video/{latitude}/{longitude}', function ($request, $response, $args) {
	$latitude = $args['latitude'];
	$longitude = $args['longitude'];
	$files = $request->getUploadedFiles();
	$filename = "";
	$db = $this->dbConnection;
	$query = $db->prepare("CALL CreateVideoLocation(?,?)");
	$query->bindParam(1,$latitude, PDO::PARAM_STR);
	$query->bindParam(2,$latitude, PDO::PARAM_STR);
	$result = $query->execute();
	if ($result) {
		$data = $query->fetchAll()[0];
		$filename = $data['filename'];
	}
	else {
		$response = $response->withStatus(400);
	}
	//ADD ERROR HANDLING
	$newfile = $files['video'];
	if ($newfile->getError() === UPLOAD_ERR_OK) {
    $uploadFileName = $newfile->getClientFilename();
    $newfile->moveTo("/var/www/hackdfw2016/GeoClipsAPI/videos/$filename");
}
    // do something with $newfile
	return $response;
});

$app->get('/video/{filename}', function($request, $response, $args) {
	$filename = $args['filename'];
    $file = "/var/www/hackdfw2016/GeoClipsAPI/videos/$filename";
    $response = $response->withHeader('Content-Description', 'File Transfer')
   ->withHeader('Content-Type', 'application/octet-stream')
   ->withHeader('Content-Disposition', 'attachment;filename="'.basename($file).'"')
   ->withHeader('Expires', '0')
   ->withHeader('Cache-Control', 'must-revalidate')
   ->withHeader('Pragma', 'public')
   ->withHeader('Content-Length', filesize($file));

	readfile($file);
	return $response;
	});
