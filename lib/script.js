//const FLICKER_OFFSET = 0.005;

function generate_prwm_from_json(url){
  d3.json( url , function( data ) {
    let temp = url.split("/");
    let t = temp[temp.length-1].split(".json")[0];
    /*
    // yOffset fix - fix flickering
    let yoffset = FLICKER_OFFSET;
		let yvalues = data.surfaces[1].y;
    //console.log(data.surfaces[1].y);
		for(let i = 0;i < yvalues.length;i++){
				yvalues[i] = yvalues[i] + yoffset;
		}
		data.surfaces[1].y = yvalues;
    //console.log(data.surfaces[1].y);*/
    
    let result = dbslice.threeMeshFromStruct(data);
    let geometry = result.geometry;
    let midpt = result.midpt;

    let color = d3.scaleSequential( d3.interpolateSpectral ) ;
    color.domain( [ 0.5, 0.8 ] );

    geometry.faces.forEach(function(face, index) {
          face.vertexColors[0] = new THREE.Color( color( geometry.faceValues[index][0] ) );
          face.vertexColors[1] = new THREE.Color( color( geometry.faceValues[index][1] ) );
          face.vertexColors[2] = new THREE.Color( color( geometry.faceValues[index][2] ) );
    })
    // Compute normals for shading
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();

    let bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
    
    let itemSize = bufferGeometry.getAttribute('position').itemSize;
    let count = bufferGeometry.getAttribute('position').count;
    
    let midpt_typed_array = new Float32Array(itemSize*count);
    midpt_typed_array[0] = midpt[0];
    midpt_typed_array[1] = midpt[1];
    midpt_typed_array[2] = midpt[2];
    
    bufferGeometry.addAttribute('midpt',new THREE.BufferAttribute(midpt_typed_array,3));
    
    let arrayBuffer = threeBuffergeometryToPrwm(bufferGeometry,true);
    let blob = new Blob([arrayBuffer], {type: 'application/binary'});
    let a = document.createElement('a');
    a.download = "task"+temp[4].split(".")[0]+"_"+temp[2]+".prwm";
    a.href = window.URL.createObjectURL(blob);
    a.textContent = 'download-link';
    a.style = 'position:absolute;top:-200px;left:-200px;font-size:12px;';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
      
    console.log(bufferGeometry);

    });
 
}

function generate_prwm_from_json_object(data,filename){
    let temp = filename.split('.json')[0];
  /*
    // yOffset fix - fix flickering
    let yoffset = FLICKER_OFFSET;
		let yvalues = data.surfaces[1].y;
    //console.log(data.surfaces[1].y);
		for(let i = 0;i < yvalues.length;i++){
				yvalues[i] = yvalues[i] + yoffset;
		}
		data.surfaces[1].y = yvalues;
    //console.log(data.surfaces[1].y);*/
    
    let result = dbslice.threeMeshFromStruct(data);
    let geometry = result.geometry;
    let midpt = result.midpt;

    let color = d3.scaleSequential( d3.interpolateSpectral ) ;
    color.domain( [ -0.5, 0.5 ] );

    geometry.faces.forEach(function(face, index) {
          face.vertexColors[0] = new THREE.Color( color( geometry.faceValues[index][0] ) );
          face.vertexColors[1] = new THREE.Color( color( geometry.faceValues[index][1] ) );
          face.vertexColors[2] = new THREE.Color( color( geometry.faceValues[index][2] ) );
    })
    // Compute normals for shading
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();

    let bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
    
    let itemSize = bufferGeometry.getAttribute('position').itemSize;
    let count = bufferGeometry.getAttribute('position').count;
    
    let midpt_typed_array = new Float32Array(itemSize*count);
    midpt_typed_array[0] = midpt[0];
    midpt_typed_array[1] = midpt[1];
    midpt_typed_array[2] = midpt[2];
    
    bufferGeometry.addAttribute('midpt',new THREE.BufferAttribute(midpt_typed_array,3));
    
    let arrayBuffer = threeBuffergeometryToPrwm(bufferGeometry,true);
    let blob = new Blob([arrayBuffer], {type: 'application/binary'});
    let a = document.createElement('a');
    a.download = temp + ".prwm";
    a.href = window.URL.createObjectURL(blob);
    a.textContent = 'download-link';
    a.style = 'position:absolute;top:-200px;left:-200px;font-size:12px;';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
      
    console.log(bufferGeometry);

};
  