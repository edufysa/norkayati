// Google Apps Script Backend for Teacher Administration Dashboard
// Following CORS bypass rules: No custom headers needed

// Spreadsheet ID - REPLACE WITH YOUR SPREADSHEET ID
const SPREADSHEET_ID = 'ID_SPREADSHEET';

// Global variables
var SS = SpreadsheetApp.getActiveSpreadsheet();

// Initialize sheets when the web app loads
function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  // Initialize sheets if they don't exist
  initializeSheets();
  
  // Process the request parameters - langsung dari e.parameter sesuai rules CORS.txt
  var params = e && e.parameter ? e.parameter : {};
  var action = params.action;
  
  // Debug logging
  Logger.log('Received request with parameters:');
  Logger.log('e.parameter:', e.parameter);
  Logger.log('action:', action);
  Logger.log('params:', params);
  
  // If no action provided, return a default response for direct browser access
  if (!action) {
    return createCORSResponse(JSON.stringify({
      success: true,
      message: "Teacher Administration API is running. Please use POST requests with an action parameter."
    }));
  }
  
  var result = { success: false, error: "Invalid action" };
  
  // Route to the appropriate function based on action
  try {
    Logger.log('Processing action:', action);
    switch(action) {
      // Debug actions
      case 'debugSiswaData':
        Logger.log('Executing debugSiswaData');
        result = debugSiswaData();
        break;
        
      // User actions
      case 'login':
        Logger.log('Executing login');
        result = login(params);
        break;
      case 'createUser':
        result = createUser(params);
        break;
      case 'updateUser':
        result = updateUser(params);
        break;
      case 'deleteUser':
        result = deleteUser(params);
        break;
      case 'getUsers':
        result = getUsers(params);
        break;
        
      // Kelas (Class) actions
      case 'getKelas':
        if (params.paginated === 'true') {
          result = getKelasPaginated(params);
        } else {
          result = getKelas(params);
        }
        break;
      case 'createKelas':
        result = createKelas(params);
        break;
      case 'updateKelas':
        result = updateKelas(params);
        break;
      case 'deleteKelas':
        result = deleteKelas(params);
        break;
        
      // Siswa (Student) actions
      case 'getSiswa':
        if (params.paginated === 'true') {
          result = getSiswaPaginated(params);
        } else {
          result = getSiswa(params);
        }
        break;
      case 'createSiswa':
        result = createSiswa(params);
        break;
      case 'updateSiswa':
        result = updateSiswa(params);
        break;
      case 'deleteSiswa':
        result = deleteSiswa(params);
        break;
        
      // Tugas (Assignment) actions
      case 'getTugas':
        if (params.paginated === 'true') {
          result = getTugasPaginated(params);
        } else {
          result = getTugas(params);
        }
        break;
      case 'createTugas':
        result = createTugas(params);
        break;
      case 'updateTugas':
        result = updateTugas(params);
        break;
      case 'deleteTugas':
        result = deleteTugas(params);
        break;
        
      // Nilai (Grade) actions
      case 'getNilai':
        if (params.paginated === 'true') {
          result = getNilaiPaginated(params);
        } else {
          result = getNilai(params);
        }
        break;
      case 'createNilai':
        result = createNilai(params);
        break;
      case 'updateNilai':
        result = updateNilai(params);
        break;
      case 'deleteNilai':
        result = deleteNilai(params);
        break;
        
      // Presensi (Attendance) actions
      case 'getPresensi':
        if (params.paginated === 'true') {
          result = getPresensiPaginated(params);
        } else {
          result = getPresensi(params);
        }
        break;
      case 'createPresensi':
        result = createPresensi(params);
        break;
      case 'updatePresensi':
        result = updatePresensi(params);
        break;
      case 'deletePresensi':
        result = deletePresensi(params);
        break;
        
      // Event actions
      case 'getEvent':
        result = getEvent(params);
        break;
      case 'getEvents':
        result = getEvents(params);
        break;
      case 'createEvent':
        result = createEvent(params);
        break;
      case 'updateEvent':
        result = updateEvent(params);
        break;
      case 'deleteEvent':
        result = deleteEvent(params);
        break;
        
      // Jurnal Pembelajaran (Learning Journal) actions
      case 'getJurnal':
        result = getJurnal(params);
        break;
      case 'createJurnal':
        result = createJurnal(params);
        break;
      case 'updateJurnal':
        result = updateJurnal(params);
        break;
      case 'deleteJurnal':
        result = deleteJurnal(params);
        break;
        
      // Bank Soal (Question Bank) actions
      case 'getBankSoal':
        result = getBankSoal(params);
        break;
      case 'createBankSoal':
        result = createBankSoal(params);
        break;
      case 'updateBankSoal':
        result = updateBankSoal(params);
        break;
      case 'deleteBankSoal':
        result = deleteBankSoal(params);
        break;
        
      // Gamifikasi actions
      case 'getGamifikasiXP':
        result = getGamifikasiXP(params);
        break;
      case 'createGamifikasiXP':
        result = createGamifikasiXP(params);
        break;
      case 'updateGamifikasiXP':
        result = updateGamifikasiXP(params);
        break;
      case 'deleteGamifikasiXP':
        result = deleteGamifikasiXP(params);
        break;
      case 'getGamifikasiBadge':
        result = getGamifikasiBadge(params);
        break;
      case 'createGamifikasiBadge':
        result = createGamifikasiBadge(params);
        break;
      case 'updateGamifikasiBadge':
        result = updateGamifikasiBadge(params);
        break;
      case 'deleteGamifikasiBadge':
        result = deleteGamifikasiBadge(params);
        break;
      case 'getSiswaBadge':
        result = getSiswaBadge(params);
        break;
      case 'createSiswaBadge':
        result = createSiswaBadge(params);
        break;
      case 'updateSiswaBadge':
        result = updateSiswaBadge(params);
        break;
      case 'deleteSiswaBadge':
        result = deleteSiswaBadge(params);
        break;
        
      // Detail Presensi (Attendance Detail) actions
      case 'getDetailPresensi':
        Logger.log('Executing getDetailPresensi');
        result = getDetailPresensi(params);
        break;
      case 'createDetailPresensi':
        Logger.log('Executing createDetailPresensi');
        result = createDetailPresensi(params);
        break;
      case 'updateDetailPresensi':
        Logger.log('Executing updateDetailPresensi');
        result = updateDetailPresensi(params);
        break;
      case 'deleteDetailPresensi':
        Logger.log('Executing deleteDetailPresensi');
        result = deleteDetailPresensi(params);
        break;
        
      default:
        // Invalid action
        Logger.log('Invalid action received:', action);
        result = { success: false, error: "Invalid action: " + action };
    }
  } catch(error) {
    Logger.log('Error in handleRequest:', error);
    result = { success: false, error: error.toString() };
  }
  
  // Return the result as JSON with CORS headers
  return createCORSResponse(JSON.stringify(result));
}

/**
 * Initializes all required sheets with proper headers if they don't exist
 */
function initializeSheets() {
  var sheets = {
    // User sheet for authentication
    'User': ['id', 'username', 'password', 'name', 'role', 'email', 'created_at', 'updated_at'],
    
    'Kelas': ['id', 'nama_kelas', 'tingkat', 'tahun_ajaran', 'wali_kelas', 'mata_pelajaran', 'created_at', 'updated_at'],
    
    'Siswa': ['id', 'kelas_id', 'nama', 'nis', 'jenis_kelamin', 'tanggal_lahir', 'alamat', 'nama_orang_tua', 'no_telp', 'created_at', 'updated_at'],
    
    'Tugas': ['id', 'kelas_id', 'judul', 'deskripsi', 'jenis', 'tanggal_mulai', 'tanggal_selesai', 'bobot', 'status', 'created_at', 'updated_at'],
    
    'Nilai': ['id', 'siswa_id', 'tugas_id', 'nilai', 'komentar', 'tanggal_penilaian', 'created_at', 'updated_at'],
    
    'Presensi': ['id', 'kelas_id', 'tanggal', 'jam_mulai', 'jam_selesai', 'materi', 'catatan', 'created_at', 'updated_at'],
    
    'DetailPresensi': ['id', 'presensi_id', 'siswa_id', 'status', 'keterangan', 'created_at', 'updated_at'],
    
    'Event': ['id', 'judul', 'deskripsi', 'jenis', 'lokasi', 'tanggal_mulai', 'tanggal_selesai', 'status', 'created_at', 'updated_at'],
    
    'JurnalPembelajaran': ['id', 'kelas_id', 'tanggal', 'materi', 'metode', 'media', 'kegiatan_pendahuluan', 'kegiatan_inti', 'kegiatan_penutup', 'evaluasi', 'refleksi', 'rencana_tindak_lanjut', 'created_at', 'updated_at'],
    
    'BankSoal': ['id', 'kategori', 'tingkat_kesulitan', 'mata_pelajaran', 'bab', 'pertanyaan', 'pilihan_a', 'pilihan_b', 'pilihan_c', 'pilihan_d', 'jawaban_benar', 'penjelasan', 'created_at', 'updated_at'],
    
    'GamifikasiXP': ['id', 'siswa_id', 'jumlah_xp', 'level', 'aktivitas', 'deskripsi', 'tanggal', 'created_at', 'updated_at'],
    
    'GamifikasiBadge': ['id', 'nama_badge', 'deskripsi', 'icon_url', 'syarat_perolehan', 'xp_reward', 'created_at', 'updated_at'],
    
    'SiswaBadge': ['id', 'siswa_id', 'badge_id', 'tanggal_perolehan', 'created_at', 'updated_at']
  };
  
  // Create each sheet if it doesn't exist
  for (var sheetName in sheets) {
    var sheet = SS.getSheetByName(sheetName);
    
    // If sheet doesn't exist, create it with headers
    if (!sheet) {
      sheet = SS.insertSheet(sheetName);
      
      // Set the headers in the first row
      var headers = sheets[sheetName];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format the header row
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
      
      // Add default admin user if this is the User sheet
      if (sheetName === 'User') {
        var adminUser = [
          generateUniqueId(),    // id
          'admin',               // username
          'admin123',            // password (in a real app, this should be hashed)
          'Administrator',       // name
          'admin',               // role
          'admin@example.com',   // email
          getCurrentTimestamp(), // created_at
          getCurrentTimestamp()  // updated_at
        ];
        sheet.appendRow(adminUser);
      }
    }
  }
}

// Helper Functions for CRUD Operations

/**
 * Generates a unique ID
 */
function generateUniqueId() {
  return Utilities.getUuid();
}

/**
 * Gets the current timestamp
 */
function getCurrentTimestamp() {
  return new Date().toISOString();
}

/**
 * Gets all data from a sheet as an array of objects
 */
function getAllData(sheetName) {
  var sheet = SS.getSheetByName(sheetName);
  if (!sheet) {
    return [];
  }
  
  var data = sheet.getDataRange().getValues();
  var headers = data.shift();
  
  return data.map(function(row) {
    var obj = {};
    headers.forEach(function(header, index) {
      obj[header] = row[index];
    });
    return obj;
  });
}

/**
 * Finds a record by ID in a specific sheet
 */
function findRecordById(sheetName, id) {
  var sheet = SS.getSheetByName(sheetName);
  if (!sheet) {
    Logger.log("Sheet not found: " + sheetName);
    return null;
  }
  
  var data = sheet.getDataRange().getValues();
  var headers = data.shift();
  
  // Convert id to string for comparison
  var idStr = String(id);
  
  Logger.log("Searching for ID: " + idStr + " in sheet: " + sheetName);
  Logger.log("Headers: " + JSON.stringify(headers));
  Logger.log("First row data: " + JSON.stringify(data[0] || []));
  Logger.log("Total rows: " + data.length);
  
  for (var i = 0; i < data.length; i++) {
    var rowId = data[i][0];
    var rowIdStr = String(rowId);
    Logger.log("Row " + i + " ID: " + rowIdStr + " (type: " + typeof rowId + "), comparing with: " + idStr);
    // Convert cell value to string for comparison
    if (rowIdStr === idStr) {
      Logger.log("Match found at row: " + (i + 2));
      var obj = {};
      headers.forEach(function(header, index) {
        obj[header] = data[i][index];
      });
      return { data: obj, rowIndex: i + 2 }; // +2 because we shifted headers and rows are 1-indexed
    }
  }
  
  Logger.log("No match found for ID: " + idStr + " in sheet: " + sheetName);
  return null;
}

/**
 * Finds a user by username
 */
function findUserByUsername(username) {
  var sheet = SS.getSheetByName('User');
  if (!sheet) {
    return null;
  }
  
  var data = sheet.getDataRange().getValues();
  var headers = data.shift();
  
  // Find username index
  var usernameIndex = headers.indexOf('username');
  if (usernameIndex === -1) return null;
  
  for (var i = 0; i < data.length; i++) {
    if (data[i][usernameIndex] === username) {
      var obj = {};
      headers.forEach(function(header, index) {
        obj[header] = data[i][index];
      });
      return { data: obj, rowIndex: i + 2 }; // +2 because we shifted headers and rows are 1-indexed
    }
  }
  
  return null;
}

// === USER AUTHENTICATION AND MANAGEMENT ===

/**
 * Authenticates a user by username and password
 */
function login(params) {
  try {
    var username = params.username;
    var password = params.password;
    
    if (!username || !password) {
      return { success: false, error: "Username and password are required" };
    }
    
    // Find user by username
    var user = findUserByUsername(username);
    
    if (!user) {
      return { success: false, error: "Invalid username or password" };
    }
    
    // Check password
    if (user.data.password !== password) {
      return { success: false, error: "Invalid username or password" };
    }
    
    // Return user data without password
    var userData = {
      id: user.data.id,
      username: user.data.username,
      name: user.data.name,
      role: user.data.role,
      email: user.data.email
    };
    
    return { 
      success: true, 
      user: userData,
      token: "session-token-" + new Date().getTime() // In a real app, generate a proper JWT or session token
    };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Creates a new user
 */
function createUser(params) {
  try {
    // Check if user with username already exists
    var existingUser = findUserByUsername(params.username);
    if (existingUser) {
      return { success: false, error: "Username already exists" };
    }
    
    var sheet = SS.getSheetByName('User');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Gets users (filtered by role if specified)
 */
function getUsers(params) {
  try {
    if (params.id) {
      // Get specific user by ID
      var record = findRecordById('User', params.id);
      if (!record) {
        return { success: false, error: "User not found" };
      }
      
      // Don't return password
      var userData = {...record.data};
      delete userData.password;
      
      return { success: true, data: userData };
    } else {
      // Get all users
      var users = getAllData('User');
      
      // Filter by role if specified
      if (params.role) {
        users = users.filter(function(user) {
          return user.role === params.role;
        });
      }
      
      // Remove passwords from results
      users = users.map(function(user) {
        var userData = {...user};
        delete userData.password;
        return userData;
      });
      
      return { success: true, data: users };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Updates a user
 */
function updateUser(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the user
    var record = findRecordById('User', params.id);
    if (!record) {
      return { success: false, error: "User not found" };
    }
    
    // If updating username, check if it's unique
    if (params.username && params.username !== record.data.username) {
      var existingUser = findUserByUsername(params.username);
      if (existingUser) {
        return { success: false, error: "Username already exists" };
      }
    }
    
    var sheet = SS.getSheetByName('User');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Deletes a user
 */
function deleteUser(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the user
    var record = findRecordById('User', params.id);
    if (!record) {
      return { success: false, error: "User not found" };
    }
    
    var sheet = SS.getSheetByName('User');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === IMPLEMENTATION FOR KELAS (CLASS) ===

function getKelas(params) {
  try {
    if (params.id) {
      // Get specific class by ID
      var record = findRecordById('Kelas', params.id);
      if (!record) {
        return { success: false, error: "Kelas not found" };
      }
      return { success: true, data: record.data };
    } else {
      // Get all classes
      var data = getAllData('Kelas');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createKelas(params) {
  try {
    var sheet = SS.getSheetByName('Kelas');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateKelas(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Kelas', params.id);
    if (!record) {
      return { success: false, error: "Kelas not found" };
    }
    
    var sheet = SS.getSheetByName('Kelas');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteKelas(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Kelas', params.id);
    if (!record) {
      return { success: false, error: "Kelas not found" };
    }
    
    var sheet = SS.getSheetByName('Kelas');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === IMPLEMENT REMAINING ENTITY OPERATIONS SIMILARLY ===
// (getSiswa, createSiswa, updateSiswa, deleteSiswa, etc.)

// === SISWA (STUDENT) OPERATIONS ===

function getSiswa(params) {
  try {
    // Accept either id or siswa_id for finding a specific student
    var id = params.id || params.siswa_id;
    if (id) {
      // Get specific student by ID
      var record = findRecordById('Siswa', id);
      if (!record) {
        return { success: false, error: "Siswa not found" };
      }
      return { success: true, data: record.data };
    } else if (params.kelas_id) {
      // Get students by class ID
      var allStudents = getAllData('Siswa');
      var filteredStudents = allStudents.filter(function(student) {
        return student.kelas_id === params.kelas_id;
      });
      return { success: true, data: filteredStudents };
    } else {
      // Get all students
      var data = getAllData('Siswa');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createSiswa(params) {
  try {
    var sheet = SS.getSheetByName('Siswa');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateSiswa(params) {
  try {
    // Accept either id or siswa_id
    var id = params.id || params.siswa_id;
    if (!id) {
      return { success: false, error: "ID is required (either id or siswa_id)" };
    }
    
    // Find the record
    var record = findRecordById('Siswa', id);
    if (!record) {
      return { success: false, error: "Siswa not found" };
    }
    
    var sheet = SS.getSheetByName('Siswa');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteSiswa(params) {
  try {
    // Accept either id or siswa_id
    var id = params.id || params.siswa_id;
    Logger.log("deleteSiswa called with params: " + JSON.stringify(params));
    Logger.log("Extracted ID: " + id + " (type: " + typeof id + ")");
    
    if (!id) {
      Logger.log("No ID provided in parameters");
      return { success: false, error: "ID is required (either id or siswa_id)" };
    }
    
    // Get all student IDs from the sheet for debugging
    var sheet = SS.getSheetByName('Siswa');
    if (sheet) {
      var data = sheet.getDataRange().getValues();
      var headers = data.shift();
      var allIds = data.map(function(row) { return String(row[0]); });
      Logger.log("All student IDs in sheet: " + JSON.stringify(allIds));
      Logger.log("Looking for ID: " + id + " in sheet");
    } else {
      Logger.log("Siswa sheet not found!");
    }
    
    // Find the record
    var record = findRecordById('Siswa', id);
    Logger.log("Record found: " + (record ? "Yes" : "No"));
    
    if (!record) {
      return { success: false, error: "Siswa not found" };
    }
    
    Logger.log("About to delete row at index: " + record.rowIndex);
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    Logger.log("Row deleted successfully");
    
    return { success: true, data: { id: id } };
  } catch (error) {
    Logger.log("Error in deleteSiswa: " + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Debug function to dump all Siswa data
 */
function debugSiswaData() {
  var sheet = SS.getSheetByName('Siswa');
  if (!sheet) {
    Logger.log("Siswa sheet not found!");
    return { success: false, error: "Siswa sheet not found" };
  }
  
  var data = sheet.getDataRange().getValues();
  var headers = data.shift();
  
  Logger.log("Headers: " + JSON.stringify(headers));
  
  var rows = [];
  for (var i = 0; i < data.length; i++) {
    var row = {};
    headers.forEach(function(header, index) {
      row[header] = data[i][index];
    });
    rows.push(row);
    Logger.log("Row " + i + ": " + JSON.stringify(row));
  }
  
  return { success: true, data: rows };
}

/**
 * Creates a response with CORS headers
 */
function createCORSResponse(jsonText) {
  return ContentService.createTextOutput(jsonText)
    .setMimeType(ContentService.MimeType.JSON);
}

// === TUGAS (ASSIGNMENT) OPERATIONS ===

function getTugas(params) {
  try {
    if (params.id) {
      // Get specific assignment by ID
      var record = findRecordById('Tugas', params.id);
      if (!record) {
        return { success: false, error: "Tugas not found" };
      }
      return { success: true, data: record.data };
    } else if (params.kelas_id) {
      // Get assignments by class ID
      var allTugas = getAllData('Tugas');
      var filteredTugas = allTugas.filter(function(tugas) {
        return tugas.kelas_id === params.kelas_id;
      });
      return { success: true, data: filteredTugas };
    } else {
      // Get all assignments
      var data = getAllData('Tugas');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createTugas(params) {
  try {
    var sheet = SS.getSheetByName('Tugas');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateTugas(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Tugas', params.id);
    if (!record) {
      return { success: false, error: "Tugas not found" };
    }
    
    var sheet = SS.getSheetByName('Tugas');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteTugas(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Tugas', params.id);
    if (!record) {
      return { success: false, error: "Tugas not found" };
    }
    
    var sheet = SS.getSheetByName('Tugas');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === NILAI (GRADE) OPERATIONS ===

function getNilai(params) {
  try {
    if (params.id) {
      // Get specific grade by ID
      var record = findRecordById('Nilai', params.id);
      if (!record) {
        return { success: false, error: "Nilai not found" };
      }
      return { success: true, data: record.data };
    } else if (params.siswa_id) {
      // Get grades by student ID
      var allNilai = getAllData('Nilai');
      var filteredNilai = allNilai.filter(function(nilai) {
        return nilai.siswa_id === params.siswa_id;
      });
      return { success: true, data: filteredNilai };
    } else if (params.tugas_id) {
      // Get grades by assignment ID
      var allNilai = getAllData('Nilai');
      var filteredNilai = allNilai.filter(function(nilai) {
        return nilai.tugas_id === params.tugas_id;
      });
      return { success: true, data: filteredNilai };
    } else {
      // Get all grades
      var data = getAllData('Nilai');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createNilai(params) {
  try {
    var sheet = SS.getSheetByName('Nilai');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateNilai(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Nilai', params.id);
    if (!record) {
      return { success: false, error: "Nilai not found" };
    }
    
    var sheet = SS.getSheetByName('Nilai');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteNilai(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Nilai', params.id);
    if (!record) {
      return { success: false, error: "Nilai not found" };
    }
    
    var sheet = SS.getSheetByName('Nilai');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === PRESENSI (ATTENDANCE) OPERATIONS ===

function getPresensi(params) {
  try {
    if (params.id) {
      // Get specific attendance by ID
      var record = findRecordById('Presensi', params.id);
      if (!record) {
        return { success: false, error: "Presensi not found" };
      }
      return { success: true, data: record.data };
    } else if (params.kelas_id) {
      // Get attendance records by class ID
      var allPresensi = getAllData('Presensi');
      var filteredPresensi = allPresensi.filter(function(presensi) {
        return presensi.kelas_id === params.kelas_id;
      });
      return { success: true, data: filteredPresensi };
    } else if (params.tanggal) {
      // Get attendance records by date
      var allPresensi = getAllData('Presensi');
      var filteredPresensi = allPresensi.filter(function(presensi) {
        return presensi.tanggal === params.tanggal;
      });
      return { success: true, data: filteredPresensi };
    } else {
      // Get all attendance records
      var data = getAllData('Presensi');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createPresensi(params) {
  try {
    var sheet = SS.getSheetByName('Presensi');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updatePresensi(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Presensi', params.id);
    if (!record) {
      return { success: false, error: "Presensi not found" };
    }
    
    var sheet = SS.getSheetByName('Presensi');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deletePresensi(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Presensi', params.id);
    if (!record) {
      return { success: false, error: "Presensi not found" };
    }
    
    var sheet = SS.getSheetByName('Presensi');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === EVENT OPERATIONS ===

// Alias for getEvent to handle plural "events" requests from the frontend
function getEvents(params) {
  return getEvent(params);
}

function getEvent(params) {
  try {
    if (params.id) {
      // Get specific event by ID
      var record = findRecordById('Event', params.id);
      if (!record) {
        return { success: false, error: "Event not found" };
      }
      return { success: true, data: record.data };
    } else {
      // Get all events
      var data = getAllData('Event');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createEvent(params) {
  try {
    var sheet = SS.getSheetByName('Event');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateEvent(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Event', params.id);
    if (!record) {
      return { success: false, error: "Event not found" };
    }
    
    var sheet = SS.getSheetByName('Event');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteEvent(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Event', params.id);
    if (!record) {
      return { success: false, error: "Event not found" };
    }
    
    var sheet = SS.getSheetByName('Event');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === JURNAL PEMBELAJARAN (LEARNING JOURNAL) OPERATIONS ===

function getJurnal(params) {
  try {
    if (params.id) {
      // Get specific journal by ID
      var record = findRecordById('JurnalPembelajaran', params.id);
      if (!record) {
        return { success: false, error: "Jurnal not found" };
      }
      return { success: true, data: record.data };
    } else if (params.kelas_id) {
      // Get journals by class ID
      var allJurnal = getAllData('JurnalPembelajaran');
      var filteredJurnal = allJurnal.filter(function(jurnal) {
        return jurnal.kelas_id === params.kelas_id;
      });
      return { success: true, data: filteredJurnal };
    } else {
      // Get all journals
      var data = getAllData('JurnalPembelajaran');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createJurnal(params) {
  try {
    var sheet = SS.getSheetByName('JurnalPembelajaran');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateJurnal(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('JurnalPembelajaran', params.id);
    if (!record) {
      return { success: false, error: "Jurnal not found" };
    }
    
    var sheet = SS.getSheetByName('JurnalPembelajaran');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteJurnal(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('JurnalPembelajaran', params.id);
    if (!record) {
      return { success: false, error: "Jurnal not found" };
    }
    
    var sheet = SS.getSheetByName('JurnalPembelajaran');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === BANK SOAL (QUESTION BANK) OPERATIONS ===

function getBankSoal(params) {
  try {
    if (params.id) {
      // Get specific question by ID
      var record = findRecordById('BankSoal', params.id);
      if (!record) {
        return { success: false, error: "Bank Soal not found" };
      }
      return { success: true, data: record.data };
    } else if (params.kategori) {
      // Get questions by category
      var allSoal = getAllData('BankSoal');
      var filteredSoal = allSoal.filter(function(soal) {
        return soal.kategori === params.kategori;
      });
      return { success: true, data: filteredSoal };
    } else {
      // Get all questions
      var data = getAllData('BankSoal');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createBankSoal(params) {
  try {
    var sheet = SS.getSheetByName('BankSoal');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateBankSoal(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('BankSoal', params.id);
    if (!record) {
      return { success: false, error: "Bank Soal not found" };
    }
    
    var sheet = SS.getSheetByName('BankSoal');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteBankSoal(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('BankSoal', params.id);
    if (!record) {
      return { success: false, error: "Bank Soal not found" };
    }
    
    var sheet = SS.getSheetByName('BankSoal');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === Gamifikasi (XP and Badge) OPERATIONS ===

function getGamifikasiXP(params) {
  try {
    if (params.id) {
      // Get specific XP record by ID
      var record = findRecordById('GamifikasiXP', params.id);
      if (!record) {
        return { success: false, error: "Gamifikasi XP not found" };
      }
      return { success: true, data: record.data };
    } else if (params.siswa_id) {
      // Get XP records by student ID
      var allXP = getAllData('GamifikasiXP');
      var filteredXP = allXP.filter(function(xp) {
        return xp.siswa_id === params.siswa_id;
      });
      return { success: true, data: filteredXP };
    } else {
      // Get all XP records
      var data = getAllData('GamifikasiXP');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createGamifikasiXP(params) {
  try {
    var sheet = SS.getSheetByName('GamifikasiXP');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateGamifikasiXP(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('GamifikasiXP', params.id);
    if (!record) {
      return { success: false, error: "Gamifikasi XP not found" };
    }
    
    var sheet = SS.getSheetByName('GamifikasiXP');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteGamifikasiXP(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('GamifikasiXP', params.id);
    if (!record) {
      return { success: false, error: "Gamifikasi XP not found" };
    }
    
    var sheet = SS.getSheetByName('GamifikasiXP');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function getGamifikasiBadge(params) {
  try {
    if (params.id) {
      // Get specific badge by ID
      var record = findRecordById('GamifikasiBadge', params.id);
      if (!record) {
        return { success: false, error: "Gamifikasi Badge not found" };
      }
      return { success: true, data: record.data };
    } else if (params.nama_badge) {
      // Get badges by name
      var allBadges = getAllData('GamifikasiBadge');
      var filteredBadges = allBadges.filter(function(badge) {
        return badge.nama_badge === params.nama_badge;
      });
      return { success: true, data: filteredBadges };
    } else {
      // Get all badges
      var data = getAllData('GamifikasiBadge');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createGamifikasiBadge(params) {
  try {
    var sheet = SS.getSheetByName('GamifikasiBadge');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateGamifikasiBadge(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('GamifikasiBadge', params.id);
    if (!record) {
      return { success: false, error: "Gamifikasi Badge not found" };
    }
    
    var sheet = SS.getSheetByName('GamifikasiBadge');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteGamifikasiBadge(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('GamifikasiBadge', params.id);
    if (!record) {
      return { success: false, error: "Gamifikasi Badge not found" };
    }
    
    var sheet = SS.getSheetByName('GamifikasiBadge');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function getSiswaBadge(params) {
  try {
    if (params.id) {
      // Get specific siswa badge by ID
      var record = findRecordById('SiswaBadge', params.id);
      if (!record) {
        return { success: false, error: "Siswa Badge not found" };
      }
      return { success: true, data: record.data };
    } else if (params.siswa_id) {
      // Get siswa badges by siswa ID
      var allSiswaBadges = getAllData('SiswaBadge');
      var filteredSiswaBadges = allSiswaBadges.filter(function(siswaBadge) {
        return siswaBadge.siswa_id === params.siswa_id;
      });
      return { success: true, data: filteredSiswaBadges };
    } else {
      // Get all siswa badges
      var data = getAllData('SiswaBadge');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createSiswaBadge(params) {
  try {
    var sheet = SS.getSheetByName('SiswaBadge');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateSiswaBadge(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('SiswaBadge', params.id);
    if (!record) {
      return { success: false, error: "Siswa Badge not found" };
    }
    
    var sheet = SS.getSheetByName('SiswaBadge');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteSiswaBadge(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('SiswaBadge', params.id);
    if (!record) {
      return { success: false, error: "Siswa Badge not found" };
    }
    
    var sheet = SS.getSheetByName('SiswaBadge');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === DETAIL PRESENSI (ATTENDANCE DETAIL) OPERATIONS ===

function getDetailPresensi(params) {
  try {
    if (params.id) {
      // Get specific detail presensi by ID
      var record = findRecordById('DetailPresensi', params.id);
      if (!record) {
        return { success: false, error: "DetailPresensi not found" };
      }
      return { success: true, data: record.data };
    } else if (params.presensi_id) {
      // Get detail presensi by presensi ID
      var allDetailPresensi = getAllData('DetailPresensi');
      var filteredDetailPresensi = allDetailPresensi.filter(function(detailPresensi) {
        return detailPresensi.presensi_id === params.presensi_id;
      });
      return { success: true, data: filteredDetailPresensi };
    } else if (params.siswa_id) {
      // Get detail presensi by student ID
      var allDetailPresensi = getAllData('DetailPresensi');
      var filteredDetailPresensi = allDetailPresensi.filter(function(detailPresensi) {
        return detailPresensi.siswa_id === params.siswa_id;
      });
      return { success: true, data: filteredDetailPresensi };
    } else {
      // Get all detail presensi records
      var data = getAllData('DetailPresensi');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createDetailPresensi(params) {
  try {
    if (!params.presensi_id) {
      return { success: false, error: "Presensi ID is required" };
    }
    
    if (!params.siswa_id) {
      return { success: false, error: "Siswa ID is required" };
    }
    
    var sheet = SS.getSheetByName('DetailPresensi');
    
    // If sheet doesn't exist, initialize sheets
    if (!sheet) {
      initializeSheets();
      sheet = SS.getSheetByName('DetailPresensi');
      
      // Double check if sheet was created
      if (!sheet) {
        return { success: false, error: "Failed to create DetailPresensi sheet" };
      }
    }
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateDetailPresensi(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('DetailPresensi', params.id);
    if (!record) {
      return { success: false, error: "DetailPresensi not found" };
    }
    
    var sheet = SS.getSheetByName('DetailPresensi');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteDetailPresensi(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('DetailPresensi', params.id);
    if (!record) {
      return { success: false, error: "DetailPresensi not found" };
    }
    
    var sheet = SS.getSheetByName('DetailPresensi');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// Implement paginated data retrieval functions

/**
 * Helper function to get paginated data from a sheet
 * @param {Object} params - Request parameters
 * @param {Sheet} sheet - The sheet to get data from
 * @param {Function} filterFn - Optional filter function for rows
 * @param {Function} transformFn - Optional transform function for rows
 * @return {Object} Paginated result with data, totalItems, and hasMore flag
 */
function getPaginatedSheetData(params, sheet, filterFn, transformFn) {
  // Get pagination parameters
  const page = parseInt(params.page) || 1;
  const pageSize = parseInt(params.pageSize) || 10;
  
  // Calculate indices
  const startRow = (page - 1) * pageSize + 2; // +2 to skip header row
  const maxRows = sheet.getLastRow() - 1; // -1 for header
  
  // Get headers
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Get data for the requested page
  let rowCount = Math.min(pageSize, maxRows - (startRow - 2));
  if (rowCount < 1) rowCount = 0;
  
  let data = [];
  if (rowCount > 0) {
    data = sheet.getRange(startRow, 1, rowCount, sheet.getLastColumn()).getValues();
  }
  
  // Filter and transform data if needed
  let resultData = data;
  let totalFilteredItems = maxRows;
  
  if (filterFn) {
    // Apply filter to the current page data
    resultData = data.filter((row, index) => filterFn(row, headers, startRow + index - 1));
    
    // Calculate total items matching the filter (this requires scanning all data)
    if (page === 1) {
      // For performance reasons, only do a full count on the first page request
      const allData = sheet.getRange(2, 1, maxRows, sheet.getLastColumn()).getValues();
      totalFilteredItems = allData.filter((row, index) => filterFn(row, headers, index + 2)).length;
    }
  }
  
  // Apply transformation if provided
  if (transformFn) {
    resultData = resultData.map((row, index) => transformFn(row, headers, startRow + index - 1));
  } else {
    // Default transformation (convert to object with header keys)
    resultData = resultData.map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    });
  }
  
  // Calculate hasMore flag
  const hasMore = startRow + rowCount - 2 < totalFilteredItems;
  
  return {
    success: true,
    data: resultData,
    pagination: {
      page: page,
      pageSize: pageSize,
      totalItems: totalFilteredItems,
      totalPages: Math.ceil(totalFilteredItems / pageSize),
      hasMore: hasMore
    }
  };
}

// Add paginated versions of the getter functions for all entity types

// Paginated Kelas (Class)
function getKelasPaginated(params) {
  try {
    const sheet = SS.getSheetByName("Kelas");
    if (!sheet) throw new Error("Sheet 'Kelas' not found");
    
    // Optional filter function
    let filterFn = null;
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filterFn = (row, headers) => {
        // Search in name, tahun_ajaran, or wali_kelas
        return row[headers.indexOf('nama')].toString().toLowerCase().includes(searchTerm) ||
               row[headers.indexOf('tahun_ajaran')].toString().toLowerCase().includes(searchTerm) ||
               row[headers.indexOf('wali_kelas')].toString().toLowerCase().includes(searchTerm);
      };
    }
    
    return getPaginatedSheetData(params, sheet, filterFn);
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// Paginated Siswa (Student)
function getSiswaPaginated(params) {
  try {
    const sheet = SS.getSheetByName("Siswa");
    if (!sheet) throw new Error("Sheet 'Siswa' not found");
    
    // Optional filter function
    let filterFn = null;
    if (params.kelas_id || params.search) {
      filterFn = (row, headers) => {
        let match = true;
        
        // Filter by kelas_id if provided
        if (params.kelas_id) {
          match = match && row[headers.indexOf('kelas_id')] == params.kelas_id;
        }
        
        // Filter by search term if provided
        if (params.search && match) {
          const searchTerm = params.search.toLowerCase();
          match = match && (
            row[headers.indexOf('nama')].toString().toLowerCase().includes(searchTerm) ||
            row[headers.indexOf('nis')].toString().toLowerCase().includes(searchTerm)
          );
        }
        
        return match;
      };
    }
    
    return getPaginatedSheetData(params, sheet, filterFn);
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// Paginated Tugas (Assignment)
function getTugasPaginated(params) {
  try {
    const sheet = SS.getSheetByName("Tugas");
    if (!sheet) throw new Error("Sheet 'Tugas' not found");
    
    // Optional filter function
    let filterFn = null;
    if (params.kelas_id || params.search) {
      filterFn = (row, headers) => {
        let match = true;
        
        // Filter by kelas_id if provided
        if (params.kelas_id) {
          match = match && row[headers.indexOf('kelas_id')] == params.kelas_id;
        }
        
        // Filter by search term if provided
        if (params.search && match) {
          const searchTerm = params.search.toLowerCase();
          match = match && (
            row[headers.indexOf('judul')].toString().toLowerCase().includes(searchTerm) ||
            row[headers.indexOf('deskripsi')].toString().toLowerCase().includes(searchTerm)
          );
        }
        
        return match;
      };
    }
    
    return getPaginatedSheetData(params, sheet, filterFn);
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// Paginated Nilai (Grade)
function getNilaiPaginated(params) {
  try {
    const sheet = SS.getSheetByName("Nilai");
    if (!sheet) throw new Error("Sheet 'Nilai' not found");
    
    // Optional filter function
    let filterFn = null;
    if (params.siswa_id || params.tugas_id) {
      filterFn = (row, headers) => {
        let match = true;
        
        // Filter by siswa_id if provided
        if (params.siswa_id) {
          match = match && row[headers.indexOf('siswa_id')] == params.siswa_id;
        }
        
        // Filter by tugas_id if provided
        if (params.tugas_id && match) {
          match = match && row[headers.indexOf('tugas_id')] == params.tugas_id;
        }
        
        return match;
      };
    }
    
    return getPaginatedSheetData(params, sheet, filterFn);
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// Paginated Presensi (Attendance)
function getPresensiPaginated(params) {
  try {
    const sheet = SS.getSheetByName("Presensi");
    if (!sheet) throw new Error("Sheet 'Presensi' not found");
    
    // Optional filter function
    let filterFn = null;
    if (params.kelas_id || params.tanggal) {
      filterFn = (row, headers) => {
        let match = true;
        
        // Filter by kelas_id if provided
        if (params.kelas_id) {
          match = match && row[headers.indexOf('kelas_id')] == params.kelas_id;
        }
        
        // Filter by tanggal if provided
        if (params.tanggal && match) {
          // Convert both to string format for comparison
          const rowDate = new Date(row[headers.indexOf('tanggal')]).toISOString().split('T')[0];
          match = match && rowDate === params.tanggal;
        }
        
        return match;
      };
    }
    
    return getPaginatedSheetData(params, sheet, filterFn);
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// Add more paginated retrieval functions for other entities as needed

// Update the handleRequest function to route to the paginated endpoints
// Add these case statements inside the switch statement in handleRequest function:

/*
// Paginated data endpoints
case 'getKelas':
  if (params.paginated === 'true') {
    result = getKelasPaginated(params);
  } else {
    result = getKelas(params);
  }
  break;
case 'getSiswa':
  if (params.paginated === 'true') {
    result = getSiswaPaginated(params);
  } else {
    result = getSiswa(params);
  }
  break;
case 'getTugas':
  if (params.paginated === 'true') {
    result = getTugasPaginated(params);
  } else {
    result = getTugas(params);
  }
  break;
case 'getNilai':
  if (params.paginated === 'true') {
    result = getNilaiPaginated(params);
  } else {
    result = getNilai(params);
  }
  break;
case 'getPresensi':
  if (params.paginated === 'true') {
    result = getPresensiPaginated(params);
  } else {
    result = getPresensi(params);
  }
  break;
*/
