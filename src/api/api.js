/** 
 * api接口的统一出口
 */
// 回执模块接口
import receipt from '@/api/receipt';
// 续期模块接口
import renewal from '@/api/renewal';

// 导出接口
export default {    
    receipt,
    renewal
    // ……
}